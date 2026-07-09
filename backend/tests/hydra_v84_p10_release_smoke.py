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
    "release/v84/RELEASE_HANDOFF.md",
    "release/v84/FINAL_RELEASE_CHECKLIST.md",
    "release/v84/FINAL_ARTIFACT_MANIFEST.json",
    "release/v84/build_windows.ps1",
    "release/v84/build_android.ps1",
    "release/v84/run_release_checks.ps1",
    "config/voice.v84.example.json",
    "src/app/HydraAndroidBootstrap.tsx",
    "src/screens/HydraV85AlphaDashboardScreen.tsx",
    "desktop/operator_shell/panel_assets/index.html",
]

def main():
    missing = [rel for rel in REQUIRED if not (ROOT / rel).exists()]

    manifest = json.loads((ROOT / "release/v84/FINAL_ARTIFACT_MANIFEST.json").read_text(encoding="utf-8"))
    client = TestClient(app)
    health = client.get("/health").json()
    full = client.get("/health/full").json()
    operator = client.post("/operator/action", json={"action": "logs"}).json()
    live = client.post("/live/event", json={"type": "VOICE_WAKE", "payload": {"text": "OMEGON"}}).json()
    native = client.get("/native-voice/status").json()

    ok = (
        not missing
        and health.get("ok") is True
        and full.get("ok") is True
        and operator.get("ok") is True
        and live.get("type") == "VOICE_WAKE"
        and "config" in native
        and "canonical_entrypoints" in manifest
    )

    print({
        "ok": ok,
        "missing": missing,
        "version": health.get("version"),
        "routers": full.get("routers"),
        "operatorOk": operator.get("ok"),
        "liveType": live.get("type"),
        "manifestRelease": manifest.get("release"),
    })
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()
