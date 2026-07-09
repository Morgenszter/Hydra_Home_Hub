from __future__ import annotations

from fastapi import APIRouter
from pydantic import BaseModel

from backend.core.hydra_command_router_v62 import HydraCommandRouterV62

router = APIRouter(prefix="/router", tags=["router"])
command_router: HydraCommandRouterV62 | None = None


class RouteCommandRequest(BaseModel):
    source: str = "HUD"
    command: str
    target: str | None = None
    payload: dict = {}
    preferredTransport: str | None = None


def set_command_router(router_instance: HydraCommandRouterV62) -> None:
    global command_router
    command_router = router_instance


@router.get("/status")
async def router_status():
    return {
        "ok": command_router is not None,
        "recent": command_router.recent(20) if command_router else [],
    }


@router.post("/command")
async def route_command(body: RouteCommandRequest):
    if not command_router:
        return {"ok": False, "error": "COMMAND_ROUTER_NOT_READY"}
    return await command_router.route(
        source=body.source,  # type: ignore[arg-type]
        command=body.command,
        target=body.target,
        payload=body.payload,
        preferred_transport=body.preferredTransport,  # type: ignore[arg-type]
    )
