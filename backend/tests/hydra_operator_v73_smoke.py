from __future__ import annotations

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.desktop.operator_desktop_v73 import HydraOperatorDesktopV73


def main():
    desktop = HydraOperatorDesktopV73()
    desktop.start()
    action = desktop.run_action("emergency_red_alert", {"source": "smoke"})
    print(json.dumps({
        "started": desktop.status()["started"],
        "action": action["action"],
        "ok": action["ok"],
    }, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
