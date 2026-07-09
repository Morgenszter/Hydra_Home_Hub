from __future__ import annotations

import asyncio
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.voice.voice_execution_runtime_v78 import HydraVoiceExecutionRuntimeV78


async def main():
    runtime = HydraVoiceExecutionRuntimeV78()
    runtime.start()
    await runtime.accept_transcript("OMEGON", 0.99)
    event = await runtime.accept_transcript("włącz czerwony alert", 0.91)
    print(json.dumps({
        "running": runtime.status()["running"],
        "eventType": event["type"],
        "microphoneRunning": runtime.status()["microphone"]["running"],
    }, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
