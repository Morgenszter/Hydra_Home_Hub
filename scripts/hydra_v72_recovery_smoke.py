from __future__ import annotations
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[1]

FILES = [
    "src/mobile/recovery/hydraRecoveryController.ts",
    "src/hooks/useHydraRuntimeBridge.ts",
    "src/components/hud/HydraRecoveryBanner.tsx",
    "src/screens/HydraHudRecoveryScreen.tsx",
]

print(json.dumps({
    "ok": all((ROOT / rel).exists() for rel in FILES),
    "files": {rel: (ROOT / rel).exists() for rel in FILES},
}, ensure_ascii=False, indent=2))
