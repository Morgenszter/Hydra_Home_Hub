from __future__ import annotations

import time
from dataclasses import dataclass, asdict
from typing import Callable

try:
    from backend.voice.omegon_voice_core_v53 import OmegonVoiceCoreV53, OmegonVoiceEvent
except Exception:
    OmegonVoiceCoreV53 = None
    OmegonVoiceEvent = object


@dataclass
class VoiceRuntimeState:
    status: str
    wake_window_active: bool
    last_wake_at: float | None
    last_command_at: float | None
    confidence_threshold: float
    command_window_seconds: float
    cooldown_until: float | None


class VoiceRuntimeControllerV61:
    def __init__(
        self,
        emit_event: Callable[[dict], None] | None = None,
        confidence_threshold: float = 0.68,
        command_window_seconds: float = 5.0,
        wake_cooldown_seconds: float = 1.2,
    ):
        self.emit_event = emit_event
        self.confidence_threshold = confidence_threshold
        self.command_window_seconds = command_window_seconds
        self.wake_cooldown_seconds = wake_cooldown_seconds
        self.last_wake_at: float | None = None
        self.last_command_at: float | None = None
        self.cooldown_until: float | None = None
        self.status = "idle"
        self.core = OmegonVoiceCoreV53(callback=self._on_core_event) if OmegonVoiceCoreV53 else None

    def start(self) -> None:
        self.status = "running"
        if self.core:
            self.core.start()

    def stop(self) -> None:
        self.status = "stopped"
        if self.core:
            self.core.stop()

    def feed_transcript(self, text: str, confidence: float = 1.0) -> dict:
        if confidence < self.confidence_threshold:
            event = self._event("VOICE_REJECTED_LOW_CONFIDENCE", text, confidence)
            self._emit(event)
            return event

        now = time.time()
        if self.cooldown_until and now < self.cooldown_until:
            event = self._event("VOICE_REJECTED_COOLDOWN", text, confidence)
            self._emit(event)
            return event

        if self.core:
            self.core.feed_transcript(text, confidence)
            return self._event("VOICE_ACCEPTED", text, confidence)

        event = self._event("VOICE_RUNTIME_UNAVAILABLE", text, confidence)
        self._emit(event)
        return event

    def state(self) -> dict:
        now = time.time()
        wake_active = self.last_wake_at is not None and now - self.last_wake_at <= self.command_window_seconds
        return asdict(VoiceRuntimeState(
            status=self.status,
            wake_window_active=wake_active,
            last_wake_at=self.last_wake_at,
            last_command_at=self.last_command_at,
            confidence_threshold=self.confidence_threshold,
            command_window_seconds=self.command_window_seconds,
            cooldown_until=self.cooldown_until,
        ))

    def _on_core_event(self, event) -> None:
        payload = asdict(event)
        now = time.time()

        if payload.get("type") == "VOICE_WAKE":
            self.last_wake_at = now
            self.cooldown_until = now + self.wake_cooldown_seconds
        elif payload.get("type") == "VOICE_COMMAND_DETECTED":
            self.last_command_at = now

        self._emit(payload)

    def _event(self, event_type: str, text: str, confidence: float) -> dict:
        return {
            "event_id": f"voice-runtime:{int(time.time() * 1000)}",
            "type": event_type,
            "text": text,
            "confidence": confidence,
            "timestamp": time.time(),
        }

    def _emit(self, payload: dict) -> None:
        if self.emit_event:
            self.emit_event(payload)
