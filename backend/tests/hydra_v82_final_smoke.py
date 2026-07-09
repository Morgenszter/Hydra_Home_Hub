from __future__ import annotations

import asyncio
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.voice.native_voice_integration_v79 import HydraNativeVoiceIntegrationV79
from desktop.operator_shell.hydra_operator_shell import HydraOperatorShell


async def main():
    voice = HydraNativeVoiceIntegrationV79()
    voice.start()
    wake = await voice.accept_transcript("OMEGON", 0.99)
    cmd = await voice.accept_transcript("włącz czerwony alert", 0.91)
    shell = HydraOperatorShell()
    shell_result = shell.run("logs")

    print(json.dumps({
        "voiceRunning": voice.status()["running"],
        "wakeType": wake["type"],
        "commandType": cmd["type"],
        "shellLogsOk": shell_result["ok"],
    }, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
