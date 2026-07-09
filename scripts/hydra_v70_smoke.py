from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

def main():
    results = {"imports": {}, "files": {}}

    modules = [
        ("backend.desktop.tray_runtime_v64", "HydraTrayRuntimeV64"),
        ("backend.voice.omegon_audio_runtime_v66", "OmegonAudioRuntimeV66"),
        ("backend.core.hydra_runtime_state_v67", "HydraRuntimeStateStoreV67"),
        ("backend.core.hydra_live_integration_v69", "HydraLiveIntegrationV69"),
        ("backend.desktop.tray_bridge_client_v69", "TrayBridgeClientV69"),
    ]

    for mod_name, symbol in modules:
        try:
            mod = __import__(mod_name, fromlist=[symbol])
            getattr(mod, symbol)
            results["imports"][mod_name] = "OK"
        except Exception as exc:
            results["imports"][mod_name] = f"ERROR: {exc}"

    required_files = [
        "src/mobile/offline/hydraOfflineState.ts",
        "src/mobile/offline/hydraOfflineStorage.ts",
        "src/hooks/useHydraOfflineRecovery.ts",
        "docs/HYDRA_V68_UNIFIED_EXPANSION.md",
        "docs/HYDRA_V69_LIVE_INTEGRATION.md",
    ]
    for rel in required_files:
        results["files"][rel] = (ROOT / rel).exists()

    print(json.dumps(results, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
