from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.voice.native_voice_integration_v79 import HydraNativeVoiceIntegrationV79

router = APIRouter(prefix="/native-voice", tags=["native-voice"])
native_voice = HydraNativeVoiceIntegrationV79()


class TranscriptRequest(BaseModel):
    text: str
    confidence: float = 1.0


class AudioFrameRequest(BaseModel):
    pcm16Base64: str
    sampleRate: int = 16000
    channels: int = 1


@router.post("/start")
async def start():
    return native_voice.start()


@router.post("/stop")
async def stop():
    return native_voice.stop()


@router.get("/status")
async def status():
    return native_voice.status()


@router.post("/transcript")
async def transcript(body: TranscriptRequest):
    return await native_voice.accept_transcript(body.text, body.confidence)


@router.post("/audio-frame")
async def audio_frame(body: AudioFrameRequest):
    return await native_voice.accept_pcm16_base64(body.pcm16Base64, body.sampleRate, body.channels)


@router.post("/mic/start")
async def mic_start():
    return native_voice.mic_start()


@router.post("/mic/stop")
async def mic_stop():
    return native_voice.mic_stop()


@router.get("/mic/status")
async def mic_status():
    return native_voice.mic_status()
