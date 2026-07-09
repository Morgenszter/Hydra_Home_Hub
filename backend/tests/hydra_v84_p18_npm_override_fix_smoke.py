from __future__ import annotations
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
required = [
    "scripts/install_android_deps_p18.ps1",
    "scripts/start_android_p18.ps1",
    "docs/HYDRA_V84_P18_NPM_OVERRIDE_FIX.md"
]
missing = [rel for rel in required if not (ROOT / rel).exists()]
ok = not missing and "overrides" not in pkg and pkg.get("devDependencies", {}).get("@types/node") == "16.18.126"
print({"ok": ok, "missing": missing, "hasOverrides": "overrides" in pkg, "nodeTypes": pkg.get("devDependencies", {}).get("@types/node")})
raise SystemExit(0 if ok else 1)
