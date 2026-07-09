from __future__ import annotations

import asyncio
import time
from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from backend.core.hydra_live_integration_v69 import HydraLiveIntegrationV69
from backend.core.hydra_runtime_state_v67 import HydraRuntimeStateV67

router = APIRouter(tags=["live-ws-v84"])
runtime_state = HydraRuntimeStateV67()
live = HydraLiveIntegrationV69(runtime_state)


@router.get("/live/state")
async def live_state():
    return live.status()


@router.post("/live/event")
async def live_event(payload: dict):
    event_type = str(payload.get("type") or "HYDRA_MANUAL_EVENT")
    event_payload = payload.get("payload") if isinstance(payload.get("payload"), dict) else payload
    return live.emit(event_type, event_payload)


@router.websocket("/ws/runtime")
async def ws_runtime(websocket: WebSocket):
    await websocket.accept()
    try:
        await websocket.send_json({
            "type": "HYDRA_RUNTIME_SNAPSHOT",
            "payload": runtime_state.snapshot(),
            "timestamp": time.time(),
        })

        while True:
            try:
                incoming = await asyncio.wait_for(websocket.receive_json(), timeout=5.0)
                if incoming.get("type") == "PING":
                    await websocket.send_json({"type": "PONG", "timestamp": time.time()})
                elif incoming.get("type") == "EMIT":
                    event = live.emit(str(incoming.get("eventType") or "HYDRA_WS_EVENT"), incoming.get("payload") or {})
                    await websocket.send_json({"type": "HYDRA_LIVE_EVENT", "payload": event})
                else:
                    await websocket.send_json({"type": "HYDRA_RUNTIME_SNAPSHOT", "payload": runtime_state.snapshot(), "timestamp": time.time()})
            except asyncio.TimeoutError:
                await websocket.send_json({
                    "type": "HYDRA_RUNTIME_SNAPSHOT",
                    "payload": runtime_state.snapshot(),
                    "timestamp": time.time(),
                })
    except WebSocketDisconnect:
        return
