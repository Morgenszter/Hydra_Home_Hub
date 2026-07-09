from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.voice.real_voice_pipeline_v75 import HydraRealVoicePipelineV75

router = APIRouter(prefix="/voice-pipeline", tags=["voice-pipeline"])
voice_pipeline = HydraRealVoicePipelineV75()


class TranscriptRequest(BaseModel):
    text: str
    confidence: float = 1.0
    source: str = "api"


@router.post("/start")
async def start_pipeline():
    return voice_pipeline.start()


@router.post("/stop")
async def stop_pipeline():
    return voice_pipeline.stop()


@router.get("/status")
async def pipeline_status():
    return voice_pipeline.status()


@router.post("/transcript")
async def transcript(body: TranscriptRequest):
    return await voice_pipeline.accept_transcript(body.text, body.confidence, body.source)
