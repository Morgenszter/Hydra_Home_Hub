from __future__ import annotations

from backend.desktop.tray_bridge_client_v69 import TrayBridgeClientV69


class HydraTrayRuntimeBindingsV73:
    def __init__(self, bridge_url: str = "http://127.0.0.1:8765"):
        self.client = TrayBridgeClientV69(bridge_url)

    def snapshot(self) -> dict:
        snap = self.client.fetch_snapshot()
        return {
            "bridgeOnline": snap.bridge_online,
            "health": snap.health,
            "tray": snap.tray,
            "runtime": snap.runtime,
        }

    def open_pairing(self) -> dict:
        return self.client.open_pairing()
