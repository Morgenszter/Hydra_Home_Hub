from __future__ import annotations

from fastapi import APIRouter

from backend.core.hydra_runtime_state_v67 import HydraRuntimeStateStoreV67

router = APIRouter(prefix="/runtime", tags=["runtime"])
runtime_store = HydraRuntimeStateStoreV67()


@router.get("/state")
async def runtime_state():
    return runtime_store.snapshot()
