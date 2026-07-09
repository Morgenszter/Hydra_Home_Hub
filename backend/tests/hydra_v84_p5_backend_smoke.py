from __future__ import annotations

import pathlib
import sys
from fastapi.testclient import TestClient

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.api.asgi_v51 import app

client = TestClient(app)

def main():
    health = client.get("/health").json()
    full = client.get("/health/full").json()
    operator = client.get("/operator/status").json()
    action = client.post("/operator/action", json={"action": "logs"}).json()
    live = client.get("/live/state").json()
    event = client.post("/live/event", json={"type": "VOICE_WAKE", "payload": {"text": "OMEGON"}}).json()

    ok = (
        health.get("ok") is True
        and full.get("ok") is True
        and "routers" in full
        and "ok" in operator
        and action.get("action") == "logs"
        and "runtime" in live
        and event.get("type") == "VOICE_WAKE"
    )
    print({
        "ok": ok,
        "health": health,
        "routers": full.get("routers"),
        "operatorAction": action,
        "eventType": event.get("type"),
    })
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()
