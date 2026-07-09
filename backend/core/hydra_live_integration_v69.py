from __future__ import annotations

import time
from typing import Any

from backend.core.hydra_runtime_state_v67 import HydraRuntimeStateV67


class HydraLiveIntegrationV69:
    def __init__(self, runtime_state: HydraRuntimeStateV67 | None = None):
        self.runtime_state = runtime_state or HydraRuntimeStateV67()
        self.events: list[dict[str, Any]] = []

    def emit(self, event_type: str, payload: dict[str, Any]) -> dict[str, Any]:
        event = {"type": event_type, "payload": payload, "timestamp": time.time()}
        self.events.append(event)
        self.events = self.events[-500:]
        self._apply_event(event)
        return event

    def _apply_event(self, event: dict[str, Any]) -> None:
        et = event["type"]
        payload = event["payload"]
        if et == "VOICE_WAKE":
            self.runtime_state.patch_voice_state({"lastWakeAt": event["timestamp"], "voiceState": "listening_command"})
        elif et == "VOICE_FINAL_TRANSCRIPT":
            stt = payload.get("stt", {})
            pipeline = payload.get("pipeline", {})
            self.runtime_state.patch_voice_state({
                "lastTranscript": stt.get("text"),
                "lastVoiceIntent": pipeline.get("intent"),
                "lastVoiceRoute": pipeline.get("route"),
                "voiceState": "cooldown",
            })
        elif et == "VOICE_COMMAND_ROUTED":
            self.runtime_state.patch_voice_state({"lastVoiceRoute": payload})
        elif et == "OPERATOR_ACTION_EXECUTED":
            self.runtime_state.patch_operator_state({"lastAction": payload.get("action"), "lastResult": payload})
        elif et == "DEVICE_COMMAND_EXECUTED":
            device_id = payload.get("target") or "unknown"
            self.runtime_state.patch_device_state(device_id, {"lastCommandResult": payload, "observedState": payload.get("result")})
        self.runtime_state.add_event(event)

    def status(self) -> dict[str, Any]:
        return {"events": self.events[-100:], "runtime": self.runtime_state.snapshot()}
