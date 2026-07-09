from __future__ import annotations
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]
files = [
    "src/screens/HydraMainCockpitScreen.tsx",
    "src/navigation/hydraCockpitRoutes.ts",
    "src/hooks/useHydraRuntimeBridge.ts",
]
print(json.dumps({
    "ok": all((ROOT / rel).exists() for rel in files),
    "files": {rel: (ROOT / rel).exists() for rel in files},
}, ensure_ascii=False, indent=2))
