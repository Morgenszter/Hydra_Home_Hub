from __future__ import annotations
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
required = [
    "tsconfig.json",
    "App.tsx",
    "src/app/HydraAndroidBootstrap.tsx",
    "src/app/hydraAndroidSettings.ts",
    "src/screens/HydraV85AlphaDashboardScreen.tsx",
    "src/types/hydra-react-native-shims.d.ts",
]
missing = [rel for rel in required if not (ROOT / rel).exists()]
tsconfig = json.loads((ROOT / "tsconfig.json").read_text(encoding="utf-8"))
bootstrap = (ROOT / "src/app/HydraAndroidBootstrap.tsx").read_text(encoding="utf-8")
ok = not missing and "src/v85/**" in tsconfig.get("exclude", []) and "HydraV85AlphaDashboardShell" in bootstrap
print({"ok": ok, "missing": missing})
raise SystemExit(0 if ok else 1)
