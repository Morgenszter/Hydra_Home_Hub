from __future__ import annotations

import asyncio
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.voice.real_voice_pipeline_v75 import HydraRealVoicePipelineV75
from backend.core.hydra_live_integration_v69 import HydraLiveIntegrationV69

async def main():
    pipe = HydraRealVoicePipelineV75()
    pipe.start()
    event = await pipe.accept_transcript("włącz światło", 0.95, "test")
    live = HydraLiveIntegrationV69()
    live.emit("VOICE_COMMAND_ROUTED", event)
    print({"eventType": event["type"], "runtimeVoiceRoute": live.status()["runtime"]["voice_state"]["lastVoiceRoute"] is not None})

if __name__ == "__main__":
    asyncio.run(main())
