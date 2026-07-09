from __future__ import annotations

import json
import pathlib
import webbrowser
from dataclasses import dataclass, asdict

from backend.desktop.tray_bridge_client_v69 import TrayBridgeClientV69


@dataclass
class OperatorShellCommandResult:
    command: str
    ok: bool
    payload: dict


class HydraOperatorShell:
    def __init__(self, bridge_url: str = "http://127.0.0.1:8765"):
        self.bridge_url = bridge_url
        self.client = TrayBridgeClientV69(bridge_url)

    def get_paths(self) -> dict:
        hydra_home = pathlib.Path.cwd() / ".hydra"
        logs_dir = hydra_home / "logs"
        config_dir = hydra_home / "config"
        models_dir = hydra_home / "models"
        for path in [logs_dir, config_dir, models_dir]:
            path.mkdir(parents=True, exist_ok=True)
        return {
            "hydraHome": str(hydra_home),
            "logsDir": str(logs_dir),
            "configDir": str(config_dir),
            "modelsDir": str(models_dir),
        }

    def get_status(self) -> dict:
        snap = self.client.fetch_snapshot()
        return self._wrap("status", True, asdict(snap))

    def run_pairing(self) -> dict:
        return self._wrap("pairing", True, self.client.open_pairing())

    def restart_bridge(self) -> dict:
        return self._wrap("restart_bridge", True, {"noop": True, "reason": "bridge restart requires packaged process supervisor"})

    def restart_discovery(self) -> dict:
        return self._wrap("restart_discovery", True, {"noop": True, "reason": "discovery restart hook pending process integration"})

    def open_logs(self) -> dict:
        paths = self.get_paths()
        return self._wrap("logs", True, {"logsDir": paths["logsDir"]})

    def emergency_red_alert(self) -> dict:
        return self._wrap("emergency_red_alert", True, {"requested": True, "path": "/operator/action"})

    def export_diagnostics(self) -> dict:
        paths = self.get_paths()
        diagnostics = {
            "status": self.get_status(),
            "paths": paths,
        }
        out = pathlib.Path(paths["logsDir"]) / "hydra_diagnostics.json"
        out.write_text(json.dumps(diagnostics, ensure_ascii=False, indent=2), encoding="utf-8")
        return self._wrap("export_diagnostics", True, {"path": str(out)})

    def open_health(self) -> dict:
        webbrowser.open(self.bridge_url + "/health")
        return self._wrap("open", True, {"opened": self.bridge_url + "/health"})

    def run(self, command: str) -> dict:
        dispatch = {
            "status": self.get_status,
            "pairing": self.run_pairing,
            "restart_bridge": self.restart_bridge,
            "restart_discovery": self.restart_discovery,
            "logs": self.open_logs,
            "emergency_red_alert": self.emergency_red_alert,
            "export_diagnostics": self.export_diagnostics,
            "open": self.open_health,
        }
        handler = dispatch.get(command)
        if not handler:
            return self._wrap(command, False, {"error": "UNKNOWN_COMMAND"})
        return handler()

    def _wrap(self, command: str, ok: bool, payload: dict) -> dict:
        return asdict(OperatorShellCommandResult(command, ok, payload))


if __name__ == "__main__":
    import sys
    shell = HydraOperatorShell()
    command = sys.argv[1] if len(sys.argv) > 1 else "status"
    print(json.dumps(shell.run(command), ensure_ascii=False, indent=2))
