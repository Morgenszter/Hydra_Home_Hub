from __future__ import annotations

import copy
import time
from typing import Any


class HydraRuntimeStateV67:
    def __init__(self):
        self.state = {
            "voice_state": {
                "voiceState": "idle",
                "lastWakeAt": None,
                "lastTranscript": None,
                "lastVoiceIntent": None,
                "lastVoiceRoute": None,
            },
            "operator_state": {
                "lastAction": None,
                "lastResult": None,
                "shellConnected": False,
            },
            "device_registry": {},
            "bridge_health": {
                "connected": False,
                "lastSeenAt": None,
            },
            "recent_events": [],
        }

    def patch_voice_state(self, patch: dict[str, Any]) -> dict[str, Any]:
        self.state["voice_state"].update(patch)
        return self.snapshot()

    def patch_operator_state(self, patch: dict[str, Any]) -> dict[str, Any]:
        self.state["operator_state"].update(patch)
        return self.snapshot()

    def patch_device_state(self, device_id: str, patch: dict[str, Any]) -> dict[str, Any]:
        current = self.state["device_registry"].setdefault(device_id, {"deviceId": device_id})
        current.update(patch)
        current["updatedAt"] = time.time()
        return self.snapshot()

    def add_event(self, event: dict[str, Any]) -> dict[str, Any]:
        self.state["recent_events"].append(event)
        self.state["recent_events"] = self.state["recent_events"][-200:]
        return self.snapshot()

    def export_diagnostics(self) -> dict[str, Any]:
        return self.snapshot()

    def snapshot(self) -> dict[str, Any]:
        return copy.deepcopy(self.state)
