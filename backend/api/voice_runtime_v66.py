from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.voice.omegon_audio_runtime_v66 import OmegonAudioRuntimeV66

router = APIRouter(prefix="/voice-runtime", tags=["voice-runtime"])
runtime = OmegonAudioRuntimeV66()


class TranscriptRequest(BaseModel):
    text: str
    confidence: float = 1.0


@router.post("/start")
async def start_runtime():
    return runtime.start()


@router.post("/stop")
async def stop_runtime():
    return runtime.stop()


@router.get("/status")
async def runtime_status():
    return runtime.state()


@router.post("/push")
async def push_transcript(body: TranscriptRequest):
    runtime.push_transcript(body.text, body.confidence)
    return {"ok": True, "state": runtime.state()}
