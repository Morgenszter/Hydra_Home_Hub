from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.voice.omegon_voice_core_v53 import OmegonVoiceCoreV53

router = APIRouter(prefix="/voice", tags=["voice"])
voice_core = OmegonVoiceCoreV53()
voice_core.start()


class VoiceTranscript(BaseModel):
    text: str
    confidence: float = 1.0


@router.get("/status")
async def voice_status():
    return {
        "ok": True,
        "engine": "OMEGON Voice Core v5.3 scaffold",
        "wakeWords": list(voice_core.wake_words),
        "recent": voice_core.recent(10),
    }


@router.post("/simulate")
async def voice_simulate(body: VoiceTranscript):
    voice_core.feed_transcript(body.text, body.confidence)
    return {"ok": True, "recent": voice_core.recent(3)}
