from __future__ import annotations

import asyncio
import time
from typing import Any

from backend.voice.microphone_provider_v78 import HydraMicrophoneProviderV78, MicrophoneChunk
from backend.voice.openwakeword_provider_v84 import HydraOpenWakeWordProviderV84
from backend.voice.real_voice_pipeline_v75 import HydraRealVoicePipelineV75
from backend.voice.vosk_provider_v84 import HydraVoskProviderV84
from backend.voice.wake_detector_v78 import HydraWakeDetectorV78


class HydraVoiceExecutionRuntimeV78:
    """
    Canonical internal voice runtime.

    v8.4 P1 wires dependency-safe OpenWakeWord/Vosk provider boundaries into the
    existing runtime. Real provider activation happens when libraries/models are installed.
    """

    def __init__(self):
        self.microphone = HydraMicrophoneProviderV78()
        self.text_wake_detector = HydraWakeDetectorV78()
        self.wake_provider = HydraOpenWakeWordProviderV84()
        self.stt_provider = HydraVoskProviderV84()
        self.pipeline = HydraRealVoicePipelineV75()

        self.running = False
        self.voice_state = "idle"
        self.command_window_started_at: float | None = None
        self.command_window_seconds = 4.0
        self.cooldown_until: float | None = None
        self.cooldown_seconds = 1.5

        self.audio_events: list[dict[str, Any]] = []
        self.wake_events: list[dict[str, Any]] = []
        self.transcript_events: list[dict[str, Any]] = []
        self.events: list[dict[str, Any]] = []

    def start(self) -> dict[str, Any]:
        self.running = True
        self.voice_state = "idle"
        self.microphone.start()
        self.wake_provider.start()
        self.stt_provider.start()
        self.pipeline.start()
        return self.status()

    def stop(self) -> dict[str, Any]:
        self.running = False
        self.voice_state = "idle"
        self.microphone.stop()
        self.wake_provider.stop()
        self.stt_provider.stop()
        self.pipeline.stop()
        return self.status()

    async def accept_transcript(self, text: str, confidence: float = 1.0, source: str = "manual_transcript") -> dict[str, Any]:
        wake = self.text_wake_detector.detect_from_text(text)
        if wake.detected:
            event = await self.pipeline.accept_transcript(text, confidence, source)
            self._record_wake({"type": "VOICE_WAKE", "payload": {"text": text, "confidence": confidence, "source": source}, "timestamp": time.time()})
        else:
            event = await self.pipeline.accept_transcript(text, confidence, source)

        self.events.append({"timestamp": time.time(), "text": text, "event": event})
        self.events = self.events[-200:]
        return event

    async def process_pcm16_chunk(self, pcm16: bytes, sample_rate: int = 16000) -> dict[str, Any]:
        now = time.time()

        if not self.running:
            return self._event("VOICE_RUNTIME_STOPPED", {"accepted": False})

        self._record_audio({"type": "AUDIO_FRAME", "bytes": len(pcm16), "sampleRate": sample_rate, "timestamp": now})

        if self.voice_state == "cooldown":
            if self.cooldown_until is not None and now >= self.cooldown_until:
                self.voice_state = "idle"
            else:
                return self._event("VOICE_COOLDOWN", {"until": self.cooldown_until})

        if self.voice_state == "idle":
            wake = self.wake_provider.process_pcm16(pcm16, sample_rate)
            if wake.get("wakeDetected"):
                self.voice_state = "listening_command"
                self.command_window_started_at = now
                self.stt_provider.begin_command_window()
                event = self._event("VOICE_WAKE", wake)
                self._record_wake(event)
                return event
            return self._event("VOICE_IDLE", {"wakeDetected": False})

        if self.voice_state == "listening_command":
            if self.command_window_started_at and now - self.command_window_started_at > self.command_window_seconds:
                ended = self.stt_provider.end_command_window()
                self.voice_state = "idle"
                event = self._event("VOICE_COMMAND_WINDOW_TIMEOUT", ended)
                self._record_transcript(event)
                return event

            stt = self.stt_provider.feed_pcm16(pcm16, sample_rate)
            if stt.get("text") and not stt.get("isFinal"):
                event = self._event("VOICE_PARTIAL_TRANSCRIPT", stt)
                self._record_transcript(event)
                return event

            if stt.get("text") and stt.get("isFinal"):
                pipeline_event = await self.pipeline.accept_transcript(str(stt["text"]), float(stt.get("confidence") or 1.0), "vosk")
                self.stt_provider.end_command_window()
                self.voice_state = "cooldown"
                self.cooldown_until = time.time() + self.cooldown_seconds
                event = self._event("VOICE_FINAL_TRANSCRIPT", {"stt": stt, "pipeline": pipeline_event})
                self._record_transcript(event)
                return event

            return self._event("VOICE_LISTENING", {"accepted": stt.get("accepted", False)})

        return self._event("VOICE_UNKNOWN_STATE", {"voiceState": self.voice_state})

    def feed_microphone_chunk(self, pcm16: bytes, sample_rate: int = 16000, channels: int = 1) -> dict[str, Any]:
        mic = self.microphone.feed_chunk(MicrophoneChunk(pcm16=pcm16, sample_rate=sample_rate, channels=channels))
        try:
            loop = asyncio.get_running_loop()
            task = loop.create_task(self.process_pcm16_chunk(pcm16, sample_rate))
            return {"microphone": mic, "scheduled": True, "task": str(task)}
        except RuntimeError:
            return {"microphone": mic, "scheduled": False, "note": "No running event loop; use process_pcm16_chunk in async runtime."}

    def status(self) -> dict[str, Any]:
        return {
            "running": self.running,
            "voiceState": self.voice_state,
            "commandWindowStartedAt": self.command_window_started_at,
            "commandWindowSeconds": self.command_window_seconds,
            "cooldownUntil": self.cooldown_until,
            "microphone": self.microphone.status(),
            "wakeProvider": self.wake_provider.status(),
            "sttProvider": self.stt_provider.status(),
            "pipeline": self.pipeline.status(),
            "recentAudioEvents": self.audio_events[-20:],
            "recentWakeEvents": self.wake_events[-20:],
            "recentTranscriptEvents": self.transcript_events[-20:],
            "recentEvents": self.events[-20:],
        }

    def _event(self, event_type: str, payload: dict[str, Any]) -> dict[str, Any]:
        event = {"type": event_type, "payload": payload, "timestamp": time.time(), "voiceState": self.voice_state}
        self.events.append(event)
        self.events = self.events[-300:]
        return event

    def _record_audio(self, event: dict[str, Any]) -> None:
        self.audio_events.append(event)
        self.audio_events = self.audio_events[-300:]

    def _record_wake(self, event: dict[str, Any]) -> None:
        self.wake_events.append(event)
        self.wake_events = self.wake_events[-100:]

    def _record_transcript(self, event: dict[str, Any]) -> None:
        self.transcript_events.append(event)
        self.transcript_events = self.transcript_events[-200:]
