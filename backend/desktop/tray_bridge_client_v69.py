from __future__ import annotations

import json
import urllib.request
from dataclasses import dataclass


@dataclass
class TrayBridgeSnapshotV69:
    bridge_online: bool
    health: dict
    tray: dict
    runtime: dict


class TrayBridgeClientV69:
    def __init__(self, base_url: str = "http://127.0.0.1:8765", timeout: float = 2.0):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    def fetch_snapshot(self) -> TrayBridgeSnapshotV69:
        try:
            health = self._get_json("/health")
            tray = self._get_json("/tray/status")
            runtime = self._get_json("/runtime/state")
            return TrayBridgeSnapshotV69(True, health, tray, runtime)
        except Exception as exc:
            return TrayBridgeSnapshotV69(False, {"error": str(exc)}, {}, {})

    def open_pairing(self) -> dict:
        return self._post_json("/pairing/open", {})

    def _get_json(self, path: str) -> dict:
        with urllib.request.urlopen(self.base_url + path, timeout=self.timeout) as response:
            return json.loads(response.read().decode("utf-8"))

    def _post_json(self, path: str, body: dict) -> dict:
        data = json.dumps(body).encode("utf-8")
        request = urllib.request.Request(
            self.base_url + path,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        with urllib.request.urlopen(request, timeout=self.timeout) as response:
            return json.loads(response.read().decode("utf-8"))
