from __future__ import annotations
import json, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[2]
required = [
    "package.json",
    "babel.config.js",
    "metro.config.js",
    "scripts/hydra_android_doctor.js",
    "scripts/install_android_deps_p17.ps1",
    "scripts/start_android_p17.ps1",
    "docs/HYDRA_V84_P17_ANDROID_METRO_BABEL_FIX.md"
]
missing = [r for r in required if not (ROOT / r).exists()]
pkg = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
dev = pkg.get("devDependencies", {})
overrides = pkg.get("overrides", {})
ok = (
    not missing
    and dev.get("@babel/parser") is not None
    and dev.get("@babel/core") is not None
    and dev.get("@types/node") == "16.18.126"
    and overrides.get("@types/node") == "16.18.126"
)
print({"ok": ok, "missing": missing, "nodeTypes": dev.get("@types/node"), "babelParser": dev.get("@babel/parser")})
raise SystemExit(0 if ok else 1)
