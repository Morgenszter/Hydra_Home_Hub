from __future__ import annotations

import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

required = [
    "src/components/HydraAnimatedLoader.tsx",
    "src/screens/LoadingScreen.tsx",
    "src/theme/hydraTheme.ts",
    "src/app/HydraAndroidBootstrap.tsx",
    "desktop/operator_shell/panel_assets/index.html",
    "docs/HYDRA_V84_P7_LOADER_UI_INTEGRATION.md",
]

missing = [rel for rel in required if not (ROOT / rel).exists()]
loading_files = list((ROOT / "src/assets/loading").glob("*")) if (ROOT / "src/assets/loading").exists() else []
print({"ok": not missing, "missing": missing, "loadingAssetCount": len(loading_files)})
raise SystemExit(1 if missing else 0)
