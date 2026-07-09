from __future__ import annotations

import os
from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.udp_fast_path_v54 import UdpFastPathV54

router = APIRouter(prefix="/udp", tags=["udp"])
udp_fast_path = UdpFastPathV54(secret=os.environ.get("HYDRA_UDP_SECRET", "hydra-local-dev-secret"))


class UdpFireRequest(BaseModel):
    host: str
    port: int
    commandType: str
    target: str
    payload: dict = {}
    ttlMs: int = 1500


@router.post("/fire")
async def udp_fire(body: UdpFireRequest):
    packet = udp_fast_path.build_packet(
        command_type=body.commandType,  # type: ignore[arg-type]
        target=body.target,
        payload=body.payload,
        ttl_ms=body.ttlMs,
    )
    udp_fast_path.send(body.host, body.port, packet)
    return {
        "ok": True,
        "packet": packet,
    }


@router.get("/sent")
async def udp_sent():
    return {"packets": udp_fast_path.sent_packets[-50:]}
