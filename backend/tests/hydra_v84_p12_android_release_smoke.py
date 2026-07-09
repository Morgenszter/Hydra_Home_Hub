from __future__ import annotations
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
required = [
    "app.json",
    "eas.json",
    "src/config/hydraAndroidConfig.ts",
    "src/app/HydraAndroidBootstrap.tsx",
    "release/v84/ANDROID_RELEASE_PASS_P12.md",
    "release/v84/ANDROID_E2E_CHECKLIST_P12.md",
    "release/v84/ANDROID_RELEASE_MANIFEST_P12.json",
    "scripts/build_android.ps1",
    "scripts/build_android.bat",
]
missing = [r for r in required if not (ROOT / r).exists()]
manifest = json.loads((ROOT / "release/v84/ANDROID_RELEASE_MANIFEST_P12.json").read_text(encoding="utf-8"))
cfg = (ROOT / "src/config/hydraAndroidConfig.ts").read_text(encoding="utf-8")
bootstrap = (ROOT / "src/app/HydraAndroidBootstrap.tsx").read_text(encoding="utf-8")
ok = (
    not missing
    and manifest.get("root") == "src/app/HydraAndroidBootstrap.tsx"
    and "defaultBridgeWsUrl" in cfg
    and "alpha" in bootstrap
)
print({"ok": ok, "missing": missing, "modes": manifest.get("modes")})
raise SystemExit(0 if ok else 1)
