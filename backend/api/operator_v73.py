from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.desktop.operator_desktop_v73 import HydraOperatorDesktopV73

router = APIRouter(prefix="/operator", tags=["operator"])
desktop = HydraOperatorDesktopV73()


class OperatorActionRequest(BaseModel):
    action: str
    payload: dict = {}


@router.get("/status")
async def operator_status():
    return desktop.status()


@router.post("/start")
async def operator_start():
    return desktop.start()


@router.post("/stop")
async def operator_stop():
    return desktop.stop()


@router.post("/action")
async def operator_action(body: OperatorActionRequest):
    return desktop.run_action(body.action, body.payload)
