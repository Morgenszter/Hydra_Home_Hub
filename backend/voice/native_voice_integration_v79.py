from __future__ import annotations

import base64
import time
from dataclasses import dataclass, asdict
from typing import Any

from backend.voice.microphone_runtime_v84 import HydraMicrophoneRuntimeV84
from backend.voice.voice_execution_runtime_v78 import HydraVoiceExecutionRuntimeV78
from backend.voice.voice_model_config_v84 import HydraVoiceModelConfigV84


@dataclass
class NativeVoiceProviderStatus:
    provider: str
    available: bool
    running: bool
    detail: str


class HydraNativeVoiceIntegrationV79:
    """
    Canonical public voice façade.

    P6 adds config/model-path diagnostics and optional local microphone runtime.
    """

    def __init__(self):
        self.config = HydraVoiceModelConfigV84.load()
        self.execution = HydraVoiceExecutionRuntimeV78()
        self.provider = "openwakeword_vosk_bridge"
        self.running = False
        self.accepted_audio_frames = 0
        self.accepted_transcripts = 0
        self.last_result: dict[str, Any] | None = None
        self.recent_errors: list[str] = []
        self.microphone_runtime = HydraMicrophoneRuntimeV84(
            sink=self.accept_pcm16_base64,
            sample_rate=self.config.sample_rate,
            channels=1,
        )

    def start(self) -> dict[str, Any]:
        self.running = True
        self.config = HydraVoiceModelConfigV84.load()
        self.execution.command_window_seconds = self.config.command_window_seconds
        self.execution.wake_provider.threshold = self.config.wake_threshold
        self.execution.wake_provider.model_path = self.config.openwakeword_model_path
        self.execution.stt_provider.model_path = self.config.vosk_model_path
        self.execution.stt_provider.sample_rate = self.config.sample_rate
        self.execution.start()
        if self.config.enable_microphone_runtime:
            self.microphone_runtime.start()
        return self.status()

    def stop(self) -> dict[str, Any]:
        self.running = False
        self.microphone_runtime.stop()
        self.execution.stop()
        return self.status()

    def mic_start(self) -> dict[str, Any]:
        return self.microphone_runtime.start()

    def mic_stop(self) -> dict[str, Any]:
        return self.microphone_runtime.stop()

    def mic_status(self) -> dict[str, Any]:
        return self.microphone_runtime.status()

    def provider_status(self) -> dict[str, Any]:
        return asdict(NativeVoiceProviderStatus(
            provider=self.provider,
            available=True,
            running=self.running,
            detail="OpenWakeWord/Vosk bridge active. Real detection requires optional models/dependencies.",
        ))

    async def accept_transcript(self, text: str, confidence: float = 1.0) -> dict[str, Any]:
        self.accepted_transcripts += 1
        result = await self.execution.accept_transcript(text, confidence, "native_voice_transcript")
        self.last_result = result
        return result

    async def accept_pcm16_base64(self, pcm16_base64: str, sample_rate: int = 16000, channels: int = 1) -> dict[str, Any]:
        try:
            raw = base64.b64decode(pcm16_base64.encode("utf-8"))
            self.accepted_audio_frames += 1
            result = await self.execution.process_pcm16_chunk(raw, sample_rate)
            self.last_result = {
                "type": "AUDIO_FRAME_PROCESSED",
                "payload": result,
                "sampleRate": sample_rate,
                "channels": channels,
                "timestamp": time.time(),
            }
            return self.last_result
        except Exception as exc:
            self.recent_errors.append(str(exc))
            self.recent_errors = self.recent_errors[-50:]
            self.last_result = {"type": "AUDIO_FRAME_REJECTED", "error": str(exc), "timestamp": time.time()}
            return self.last_result

    def status(self) -> dict[str, Any]:
        execution_status = self.execution.status()
        return {
            "running": self.running,
            "provider": self.provider_status(),
            "config": self.config.diagnostics(),
            "microphoneRuntime": self.microphone_runtime.status(),
            "acceptedAudioFrames": self.accepted_audio_frames,
            "acceptedTranscripts": self.accepted_transcripts,
            "lastResult": self.last_result,
            "voiceState": execution_status.get("voiceState"),
            "wakeProvider": execution_status.get("wakeProvider"),
            "sttProvider": execution_status.get("sttProvider"),
            "execution": execution_status,
            "errors": self.recent_errors[-10:],
        }
