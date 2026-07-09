from __future__ import annotations

import asyncio
import base64
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.voice.native_voice_integration_v79 import HydraNativeVoiceIntegrationV79
from desktop.operator_shell.hydra_operator_shell import HydraOperatorShell
from desktop.operator_shell.hydra_tray_app import HydraTrayApp
from desktop.operator_shell.hydra_operator_panel import HydraOperatorPanel


async def main():
    voice = HydraNativeVoiceIntegrationV79()
    voice.start()
    wake = await voice.accept_transcript("OMEGON", 0.99)
    cmd = await voice.accept_transcript("włącz czerwony alert", 0.91)
    frame = await voice.accept_pcm16_base64(base64.b64encode(b"\x00\x00" * 160).decode("utf-8"), 16000, 1)

    shell = HydraOperatorShell()
    logs = shell.run("logs")
    diag = shell.run("export_diagnostics")
    tray = HydraTrayApp(shell).run()
    panel_html = HydraOperatorPanel(shell).render_html()

    print(json.dumps({
        "voiceRunning": voice.status()["running"],
        "wakeType": wake["type"],
        "commandType": cmd["type"],
        "frameType": frame["type"],
        "shellLogsOk": logs["ok"],
        "diagnosticsOk": diag["ok"],
        "trayOk": tray["ok"],
        "panelHasHydra": "HYDRA OPERATOR" in panel_html,
    }, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    asyncio.run(main())
