from __future__ import annotations

import threading
import webbrowser
from dataclasses import dataclass, asdict
from typing import Callable


@dataclass
class TrayStatusSnapshot:
    bridge_url: str
    pairing_open: bool = False
    ws_clients: int = 0
    voice_status: str = "unknown"
    udp_packets: int = 0


class HydraTrayRuntimeV64:
    def __init__(
        self,
        bridge_url: str = "http://127.0.0.1:8765",
        open_pairing: Callable[[], None] | None = None,
        restart_discovery: Callable[[], None] | None = None,
        restart_bridge: Callable[[], None] | None = None,
    ):
        self.bridge_url = bridge_url
        self.open_pairing = open_pairing
        self.restart_discovery = restart_discovery
        self.restart_bridge = restart_bridge
        self.snapshot = TrayStatusSnapshot(bridge_url=bridge_url)
        self.started = False

    def start(self) -> dict:
        self.started = True
        return {"ok": True, "mode": "tray_scaffold", "snapshot": asdict(self.snapshot)}

    def stop(self) -> dict:
        self.started = False
        return {"ok": True}

    def set_status(self, **kwargs) -> dict:
        for key, value in kwargs.items():
            if hasattr(self.snapshot, key):
                setattr(self.snapshot, key, value)
        return asdict(self.snapshot)

    def open_admin(self) -> None:
        webbrowser.open(f"{self.bridge_url}/health")

    def open_pairing_page(self) -> None:
        webbrowser.open(f"{self.bridge_url}/pairing/open")
        if self.open_pairing:
            self.open_pairing()

    def status(self) -> dict:
        return {"started": self.started, "snapshot": asdict(self.snapshot)}
