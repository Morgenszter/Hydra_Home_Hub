from __future__ import annotations

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.api.native_voice_v79 import router as native_voice_router
from backend.api.operator_v84 import router as operator_router
from backend.api.live_ws_v84 import router as live_ws_router

app = FastAPI(title="HYDRA Backend v8.4", version="8.4-p5")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(native_voice_router)
app.include_router(operator_router)
app.include_router(live_ws_router)


@app.get("/health")
async def health():
    return {"ok": True, "service": "hydra-backend", "version": "8.4-p5"}


@app.get("/health/full")
async def health_full():
    return {
        "ok": True,
        "service": "hydra-backend",
        "version": "8.4-p5",
        "routers": [
            "/native-voice",
            "/operator",
            "/live/state",
            "/live/event",
            "/ws/runtime",
        ],
    }
