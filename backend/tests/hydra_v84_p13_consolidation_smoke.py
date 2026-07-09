from __future__ import annotations

import json
import pathlib
import sys
from fastapi.testclient import TestClient

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.api.asgi_v51 import app

REQUIRED = [
    "README_OPERATIONAL_P13.md",
    "release/v84/P13_RUNBOOK_STEP_BY_STEP.md",
    "release/v84/P13_FINAL_RISK_REGISTER.md",
    "release/v84/P13_CANONICAL_PATHS.json",
    "scripts/start_backend_p13.ps1",
    "scripts/start_operator_panel_p13.ps1",
    "scripts/run_p13_smoke.ps1",
    "src/app/HydraAndroidBootstrap.tsx",
    "src/config/hydraAndroidConfig.ts",
    "desktop/operator_shell/panel_assets/index.html",
]

def main():
    missing = [rel for rel in REQUIRED if not (ROOT / rel).exists()]
    paths = json.loads((ROOT / "release/v84/P13_CANONICAL_PATHS.json").read_text(encoding="utf-8"))

    client = TestClient(app)
    health = client.get("/health").json()
    operator = client.post("/operator/action", json={"action": "logs"}).json()
    live = client.post("/live/event", json={"type": "P13_SMOKE", "payload": {"ok": True}}).json()
    native = client.get("/native-voice/status").json()

    ok = (
        not missing
        and paths["backend"]["port"] == 8765
        and "alpha" in paths["android"]["modes"]
        and health.get("ok") is True
        and operator.get("ok") is True
        and live.get("type") == "P13_SMOKE"
        and "config" in native
    )

    print({
        "ok": ok,
        "missing": missing,
        "backendPort": paths["backend"]["port"],
        "androidModes": paths["android"]["modes"],
        "operatorOk": operator.get("ok"),
        "liveType": live.get("type"),
    })
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()
