from __future__ import annotations

import asyncio
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.api.asgi_v51 import app


async def call_asgi(method: str, path: str, body: dict | None = None) -> tuple[int, dict]:
    raw_body = json.dumps(body or {}).encode("utf-8") if body is not None else b""
    messages = []

    async def receive():
        return {
            "type": "http.request",
            "body": raw_body,
            "more_body": False,
        }

    async def send(message):
        messages.append(message)

    scope = {
        "type": "http",
        "asgi": {"version": "3.0"},
        "http_version": "1.1",
        "method": method,
        "path": path,
        "raw_path": path.encode("utf-8"),
        "query_string": b"",
        "headers": [(b"content-type", b"application/json")],
        "client": ("127.0.0.1", 12345),
        "server": ("127.0.0.1", 8765),
        "scheme": "http",
    }

    await app(scope, receive, send)

    status = 0
    chunks: list[bytes] = []
    for message in messages:
        if message["type"] == "http.response.start":
            status = int(message["status"])
        elif message["type"] == "http.response.body":
            chunks.append(message.get("body", b""))

    data = json.loads(b"".join(chunks).decode("utf-8") or "{}")
    return status, data


async def main_async() -> int:
    checks = []

    checks.append(await call_asgi("GET", "/health"))
    checks.append(await call_asgi("GET", "/health/full"))
    checks.append(await call_asgi("GET", "/operator/status"))
    checks.append(await call_asgi("POST", "/operator/action", {"action": "logs"}))
    checks.append(await call_asgi("GET", "/live/state"))
    checks.append(await call_asgi("POST", "/live/event", {"type": "P19_WIN11_SMOKE", "payload": {"ok": True}}))
    checks.append(await call_asgi("GET", "/native-voice/status"))

    required_files = [
        "backend/api/asgi_v51.py",
        "backend/api/operator_v84.py",
        "backend/api/live_ws_v84.py",
        "backend/api/native_voice_v79.py",
        "desktop/operator_shell/hydra_tray_app.py",
        "desktop/operator_shell/panel_assets/index.html",
        "scripts/win11_start_backend_p19.ps1",
        "scripts/win11_start_operator_p19.ps1",
        "scripts/win11_build_dist_p19.ps1",
    ]
    missing = [rel for rel in required_files if not (ROOT / rel).exists()]

    ok = (
        not missing
        and all(status == 200 for status, _ in checks)
        and checks[0][1].get("ok") is True
        and checks[3][1].get("ok") is True
        and checks[5][1].get("type") == "P19_WIN11_SMOKE"
        and "config" in checks[6][1]
    )

    print({
        "ok": ok,
        "missing": missing,
        "statuses": [status for status, _ in checks],
        "health": checks[0][1],
        "operatorAction": checks[3][1],
        "liveEvent": checks[5][1],
    })
    return 0 if ok else 1


def main() -> None:
    raise SystemExit(asyncio.run(main_async()))


if __name__ == "__main__":
    main()
