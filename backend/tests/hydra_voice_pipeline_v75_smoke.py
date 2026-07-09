from __future__ import annotations

import asyncio
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.voice.real_voice_pipeline_v75 import HydraRealVoicePipelineV75


async def main():
    pipeline = HydraRealVoicePipelineV75()
    pipeline.start()
    wake = await pipeline.accept_transcript("OMEGON", 0.99)
    command = await pipeline.accept_transcript("włącz czerwony alert", 0.91)
    print(json.dumps({
        "running": pipeline.status()["running"],
        "wakeType": wake["type"],
        "commandType": command["type"],
        "lastIntent": pipeline.status()["lastIntent"],
    }, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
