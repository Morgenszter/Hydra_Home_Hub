from __future__ import annotations

import time

class SimulatedAdapter:
    def __init__(self, device_id: str, initial_state: dict | None = None):
        self.device_id = device_id
        self.state = {
            "online": True,
            "power": False,
            "brightness": 100,
            "color": "#ffffff",
            "temperature": 20.0,
            "targetTemperature": 21.0,
            "mode": "standby",
            "simulation": True,
        }
        if initial_state:
            self.state.update(initial_state)

    async def execute(self, command: str, params: dict | None = None) -> dict:
        params = params or {}
        if command in {"power", "setPower"}:
            self.state["power"] = bool(params.get("on", params.get("power", True)))
        elif command in {"setBrightness", "brightness"}:
            self.state["brightness"] = max(0, min(100, int(params.get("brightness", 100))))
        elif command in {"setColor", "color"}:
            self.state["color"] = str(params.get("color", "#ffffff"))
            if "brightness" in params:
                self.state["brightness"] = max(0, min(100, int(params["brightness"])))
            self.state["power"] = True
        elif command in {"setTemperature", "temperature", "setTargetTemperature"}:
            self.state["targetTemperature"] = max(5.0, min(35.0, float(params.get("temperature", params.get("targetTemperature", 21)))))
        elif command in {"setMode", "mode"}:
            self.state["mode"] = str(params.get("mode", "comfort"))
        elif command in {"getState", "state"}:
            pass
        else:
            raise ValueError(f"Nieobsługiwana komenda symulowana: {command}")

        self.state["online"] = True
        return {
            "deviceId": self.device_id,
            "state": dict(self.state),
            "lastSeen": time.time(),
            "ok": True,
            "command": command,
        }
