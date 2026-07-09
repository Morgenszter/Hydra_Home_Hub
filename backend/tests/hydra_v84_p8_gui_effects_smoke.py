from __future__ import annotations

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
required = [
    "src/effects/HydraGuiEffectsTheme.ts",
    "src/components/HydraGlassPanel.tsx",
    "desktop/operator_shell/panel_assets/index.html",
    "docs/HYDRA_V84_P8_GUI_EFFECTS_INTEGRATION.md",
]

missing = [rel for rel in required if not (ROOT / rel).exists()]
asset_dirs = [
    ROOT / "assets/gui-effects/loading-transparent",
    ROOT / "assets/gui-effects/alpha-frames",
    ROOT / "assets/gui-effects/alpha-icons",
]
asset_count = sum(len(list(path.glob("*"))) for path in asset_dirs if path.exists())

print({"ok": not missing and asset_count > 0, "missing": missing, "assetCount": asset_count})
raise SystemExit(0 if not missing and asset_count > 0 else 1)
