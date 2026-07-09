from __future__ import annotations

import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.core.hydra_runtime_state_v67 import HydraRuntimeStateStoreV67
from backend.core.hydra_live_integration_v69 import HydraLiveIntegrationV69
from backend.desktop.tray_bridge_client_v69 import TrayBridgeClientV69


def run():
    store = HydraRuntimeStateStoreV67()
    live = HydraLiveIntegrationV69(store)
    live.record_event("VOICE_WAKE", {"text": "OMEGON"})
    live.record_event("ROUTED_COMMAND_COMPLETED", {"route": {"command": "setPower"}})
    state = store.snapshot()

    assert state["voice_state"]["lastEvent"] == "VOICE_WAKE"
    assert len(state["recent_command_routes"]) == 1
    assert TrayBridgeClientV69 is not None

    return {
        "ok": True,
        "voice": state["voice_state"],
        "recentRoutes": state["recent_command_routes"],
    }


if __name__ == "__main__":
    import json
    print(json.dumps(run(), ensure_ascii=False, indent=2))
