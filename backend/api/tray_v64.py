from __future__ import annotations

from fastapi import APIRouter

from backend.desktop.tray_runtime_v64 import HydraTrayRuntimeV64

router = APIRouter(prefix="/tray", tags=["tray"])
tray_runtime = HydraTrayRuntimeV64()


@router.get("/status")
async def tray_status():
    return tray_runtime.status()


@router.post("/start")
async def tray_start():
    return tray_runtime.start()


@router.post("/open_pairing")
async def tray_open_pairing():
    tray_runtime.open_pairing_page()
    return {"ok": True}
