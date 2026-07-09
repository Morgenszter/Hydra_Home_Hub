from __future__ import annotations

import time
from fastapi import APIRouter
from pydantic import BaseModel

from desktop.operator_shell.hydra_operator_shell import HydraOperatorShell

router = APIRouter(prefix="/operator", tags=["operator-v84"])
shell = HydraOperatorShell()


class OperatorActionRequest(BaseModel):
    action: str
    payload: dict = {}


@router.get("/status")
async def operator_status():
    status = shell.run("status")
    return {
        "ok": bool(status.get("ok")),
        "service": "operator-v84",
        "status": status,
        "timestamp": time.time(),
    }


@router.post("/action")
async def operator_action(body: OperatorActionRequest):
    result = shell.run(body.action)
    return {
        "ok": bool(result.get("ok")),
        "action": body.action,
        "executed": bool(result.get("ok")),
        "payload": body.payload,
        "result": result,
        "timestamp": time.time(),
    }
