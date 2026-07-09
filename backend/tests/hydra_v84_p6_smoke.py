from __future__ import annotations

import pathlib
import sys
from fastapi.testclient import TestClient

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.api.asgi_v51 import app
from backend.voice.voice_model_config_v84 import HydraVoiceModelConfigV84
from backend.voice.microphone_runtime_v84 import HydraMicrophoneRuntimeV84

def main():
    cfg = HydraVoiceModelConfigV84.load()
    mic = HydraMicrophoneRuntimeV84()
    started = mic.start()
    stopped = mic.stop()

    client = TestClient(app)
    mic_status = client.get("/native-voice/mic/status").json()
    native_status = client.get("/native-voice/status").json()

    ok = (
        isinstance(cfg.diagnostics(), dict)
        and "fallbackMode" in started
        and "running" in stopped
        and "running" in mic_status
        and "config" in native_status
    )

    print({
        "ok": ok,
        "config": cfg.diagnostics(),
        "micStarted": started,
        "micStopped": stopped,
        "apiMicStatus": mic_status,
    })
    raise SystemExit(0 if ok else 1)

if __name__ == "__main__":
    main()
