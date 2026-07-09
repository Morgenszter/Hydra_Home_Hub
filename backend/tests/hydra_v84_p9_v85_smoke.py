from __future__ import annotations

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
required = [
    "src/screens/HydraV85AlphaDashboardScreen.tsx",
    "src/screens/HydraV85AlphaDashboardShell.tsx",
    "src/app/HydraAndroidBootstrap.tsx",
    "docs/HYDRA_V84_P9_V85_ALPHA_DASHBOARD_INTEGRATION.md",
]

missing = [rel for rel in required if not (ROOT / rel).exists()]
bootstrap = (ROOT / "src/app/HydraAndroidBootstrap.tsx").read_text(encoding="utf-8")
has_alpha_mode = 'mode: "alpha"' in bootstrap or 'mode === "alpha"' in bootstrap
asset_count = len(list((ROOT / "assets/v85-gui").rglob("*"))) if (ROOT / "assets/v85-gui").exists() else 0

print({"ok": not missing and has_alpha_mode, "missing": missing, "hasAlphaMode": has_alpha_mode, "v85AssetCount": asset_count})
raise SystemExit(0 if not missing and has_alpha_mode else 1)
