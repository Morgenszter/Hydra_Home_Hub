from __future__ import annotations

import time
import uuid
from typing import Any


class HydraCommandRouterV62:
    def __init__(self):
        self.history: list[dict[str, Any]] = []
        self.command_registry = self._build_command_registry()

    def _build_command_registry(self):
        return {
            "scene.red_alert": self._route_scene_red_alert,
            "panic_stop": self._route_panic_stop,
            "setPower": self._route_set_power,
            "setTemperature": self._route_set_temperature,
            "restart_bridge": self._route_operator,
            "open_pairing": self._route_operator,
        }

    def route(self, command: str | None, target: str | None = None, value: Any = None, source: str = "voice") -> dict[str, Any]:
        started = time.time()
        route_id = str(uuid.uuid4())
        if not command or command not in self.command_registry:
            result = self._result(route_id, source, command, target, False, False, None, "UNKNOWN_COMMAND", started)
            self._remember(result)
            return result

        try:
            payload = self.command_registry[command](target, value)
            result = self._result(route_id, source, command, target, True, True, payload, None, started)
        except Exception as exc:
            result = self._result(route_id, source, command, target, True, False, None, str(exc), started)

        self._remember(result)
        return result

    def _route_scene_red_alert(self, target, value):
        return {"scene": "red_alert", "triggered": True}

    def _route_panic_stop(self, target, value):
        return {"panicStop": True}

    def _route_set_power(self, target, value):
        return {"device": target, "power": bool(value)}

    def _route_set_temperature(self, target, value):
        return {"device": target, "temperature": value}

    def _route_operator(self, target, value):
        return {"operatorAction": True, "target": target, "value": value}

    def _result(self, route_id, source, command, target, accepted, executed, result, error, started):
        return {
            "ok": accepted and executed and error is None,
            "routeId": route_id,
            "source": source,
            "command": command,
            "target": target,
            "accepted": accepted,
            "executed": executed,
            "transport": "runtime",
            "result": result,
            "error": error,
            "timestamp": time.time(),
            "latencyMs": int((time.time() - started) * 1000),
        }

    def _remember(self, result):
        self.history.append(result)
        self.history = self.history[-200:]
