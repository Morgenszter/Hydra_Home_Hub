from __future__ import annotations

import time
from dataclasses import dataclass, asdict
from typing import Callable


@dataclass
class OperatorActionResult:
    ok: bool
    action: str
    timestamp: float
    payload: dict


class HydraOperatorDesktopV73:
    def __init__(
        self,
        open_pairing: Callable[[], dict] | None = None,
        restart_discovery: Callable[[], dict] | None = None,
        restart_bridge: Callable[[], dict] | None = None,
        emergency_action: Callable[[str], dict] | None = None,
        open_logs: Callable[[], dict] | None = None,
    ):
        self.open_pairing = open_pairing
        self.restart_discovery = restart_discovery
        self.restart_bridge = restart_bridge
        self.emergency_action = emergency_action
        self.open_logs = open_logs
        self.started = False
        self.last_action: dict | None = None

    def start(self) -> dict:
        self.started = True
        return {"ok": True, "started": True}

    def stop(self) -> dict:
        self.started = False
        return {"ok": True, "started": False}

    def status(self) -> dict:
        return {"started": self.started, "lastAction": self.last_action}

    def run_action(self, action: str, payload: dict | None = None) -> dict:
        payload = payload or {}
        if action == "open_pairing" and self.open_pairing:
            result = self.open_pairing()
        elif action == "restart_discovery" and self.restart_discovery:
            result = self.restart_discovery()
        elif action == "restart_bridge" and self.restart_bridge:
            result = self.restart_bridge()
        elif action == "open_logs" and self.open_logs:
            result = self.open_logs()
        elif action == "emergency_red_alert" and self.emergency_action:
            result = self.emergency_action("red_alert")
        else:
            result = {"ok": True, "noop": True, "action": action, "payload": payload}

        wrapped = asdict(OperatorActionResult(True, action, time.time(), {"request": payload, "result": result}))
        self.last_action = wrapped
        return wrapped
