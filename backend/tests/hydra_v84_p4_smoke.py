from __future__ import annotations

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

required = [
    "src/app/hydraAndroidSettings.ts",
    "src/app/HydraAndroidBootstrap.tsx",
    "desktop/operator_shell/panel_assets/index.html",
    "desktop/operator_shell/hydra_operator_panel.py",
    "release/v84/FINAL_ARTIFACT_STRUCTURE.md",
]

missing = [rel for rel in required if not (ROOT / rel).exists()]
print({"ok": not missing, "missing": missing})
raise SystemExit(1 if missing else 0)
