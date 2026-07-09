from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.hydra_live_integration_v69 import HydraLiveIntegrationV69
from backend.core.hydra_runtime_state_v67 import HydraRuntimeStateStoreV67

router = APIRouter(prefix="/live", tags=["live"])
runtime_store = HydraRuntimeStateStoreV67()
live_integration = HydraLiveIntegrationV69(runtime_store)


class LiveEventRequest(BaseModel):
    type: str
    payload: dict = {}


@router.get("/state")
async def live_state():
    return runtime_store.snapshot()


@router.get("/events")
async def live_events(limit: int = 100):
    return live_integration.recent(limit)


@router.post("/event")
async def live_event(body: LiveEventRequest):
    return live_integration.record_event(body.type, body.payload)
