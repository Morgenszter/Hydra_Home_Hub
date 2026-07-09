from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

checks = {
    "canonical_json": (ROOT / "HYDRA_CANONICAL_ENTRYPOINTS.json").exists(),
    "backend_asgi_v51": (ROOT / "backend/api/asgi_v51.py").exists(),
    "android_bootstrap": (ROOT / "src/app/HydraAndroidBootstrap.tsx").exists(),
    "desktop_shell": (ROOT / "desktop/operator_shell/hydra_operator_shell.py").exists(),
    "native_voice": (ROOT / "backend/voice/native_voice_integration_v79.py").exists(),
    "voice_execution": (ROOT / "backend/voice/voice_execution_runtime_v78.py").exists(),
}

print(json.dumps({"ok": all(checks.values()), "checks": checks}, ensure_ascii=False, indent=2))
