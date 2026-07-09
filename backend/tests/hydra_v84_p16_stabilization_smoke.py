from __future__ import annotations
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
required = [
    "package.json", ".npmrc", "src/app/HydraAppRoot.tsx",
    "scripts/start_operator_panel_p13.ps1", "scripts/start_backend_p13.ps1",
    "scripts/install_backend_test_deps_p16.ps1", "scripts/install_android_deps_p16.ps1",
    "scripts/start_android_p16.ps1", "docs/HYDRA_V84_P16_FINAL_STABILIZATION.md"
]
missing = [r for r in required if not (ROOT/r).exists()]
pkg = json.loads((ROOT/"package.json").read_text(encoding="utf-8"))
deps = pkg.get("dependencies", {})
operator_script = (ROOT/"scripts/start_operator_panel_p13.ps1").read_text(encoding="utf-8")
ok = not missing and deps.get("react-native") == "0.69.9" and deps.get("react") == "18.0.0" and deps.get("expo") == "~46.0.0" and "python -m desktop.operator_shell.hydra_tray_app" in operator_script
print({"ok": ok, "missing": missing, "react": deps.get("react"), "reactNative": deps.get("react-native"), "expo": deps.get("expo")})
raise SystemExit(0 if ok else 1)
