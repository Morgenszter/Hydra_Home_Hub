from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.voice.voice_execution_runtime_v78 import HydraVoiceExecutionRuntimeV78

router = APIRouter(prefix="/voice-execution", tags=["voice-execution"])
runtime = HydraVoiceExecutionRuntimeV78()


class TranscriptRequest(BaseModel):
    text: str
    confidence: float = 1.0


class ChunkRequest(BaseModel):
    pcm16_base64: str
    sample_rate: int = 16000
    channels: int = 1


@router.post("/start")
async def start_runtime():
    return runtime.start()


@router.post("/stop")
async def stop_runtime():
    return runtime.stop()


@router.get("/status")
async def runtime_status():
    return runtime.status()


@router.post("/transcript")
async def runtime_transcript(body: TranscriptRequest):
    return await runtime.accept_transcript(body.text, body.confidence)
