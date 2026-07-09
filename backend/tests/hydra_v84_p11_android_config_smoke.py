from __future__ import annotations

import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

required = [
    "app.json",
    "eas.json",
    "src/config/hydraAndroidConfig.ts",
    "src/app/HydraAndroidBootstrap.tsx",
    "src/app/hydraAndroidSettings.ts",
    "assets/android/icon.png",
    "assets/android/adaptive-icon.png",
    "assets/android/splash.png",
    "docs/HYDRA_V84_P11_V86_ANDROID_CONFIG_INTEGRATION.md",
]

missing = [rel for rel in required if not (ROOT / rel).exists()]
app = json.loads((ROOT / "app.json").read_text(encoding="utf-8"))
hydra = app.get("expo", {}).get("extra", {}).get("hydra", {})
cfg_text = (ROOT / "src/config/hydraAndroidConfig.ts").read_text(encoding="utf-8")
settings_text = (ROOT / "src/app/hydraAndroidSettings.ts").read_text(encoding="utf-8")

ok = (
    not missing
    and hydra.get("bridgeDefaultHost") == "http://192.168.1.100:8765"
    and hydra.get("bridgeDefaultWs") == "ws://192.168.1.100:8765/ws/runtime"
    and "defaultBridgeWsUrl" in cfg_text
    and "HYDRA_ANDROID_CONFIG.defaultBridgeUrl" in settings_text
)

print({
    "ok": ok,
    "missing": missing,
    "bridgeDefaultHost": hydra.get("bridgeDefaultHost"),
    "bridgeDefaultWs": hydra.get("bridgeDefaultWs"),
})
raise SystemExit(0 if ok else 1)
