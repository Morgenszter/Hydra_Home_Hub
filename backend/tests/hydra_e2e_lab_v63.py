from __future__ import annotations

import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

import asyncio
import json
import time

from backend.core.hydra_command_router_v62 import HydraCommandRouterV62
from backend.voice.voice_runtime_controller_v61 import VoiceRuntimeControllerV61


class FakeDeviceManager:
    async def execute(self, device_id: str, command: str, params: dict):
        await asyncio.sleep(0.01)
        return {"ok": True, "deviceId": device_id, "command": command, "params": params, "status": "completed"}


class FakeSceneManager:
    async def execute_scene(self, scene_id: str):
        await asyncio.sleep(0.01)
        return {"ok": True, "sceneId": scene_id, "status": "completed"}


async def run_e2e_lab() -> dict:
    events: list[dict] = []

    async def broadcast(payload: dict):
        events.append(payload)

    router = HydraCommandRouterV62(
        device_manager=FakeDeviceManager(),
        scene_manager=FakeSceneManager(),
        broadcaster=broadcast,
    )

    voice = VoiceRuntimeControllerV61(emit_event=lambda payload: events.append(payload))
    voice.start()
    voice.feed_transcript("OMEGON", 0.99)
    await asyncio.sleep(0.05)

    routed_device = await router.route(
        source="HUD",
        command="setPower",
        target="lotus_ble_main",
        payload={"on": True},
    )

    routed_scene = await router.route(
        source="VOICE",
        command="scene.red_alert",
        target="red_alert",
        payload={"sceneId": "red_alert"},
    )

    routed_udp = await router.route(
        source="SYSTEM",
        command="red_alert",
        target="broadcast",
        payload={},
    )

    voice.stop()

    return {
        "ok": True,
        "eventsCount": len(events),
        "voiceState": voice.state(),
        "routedDevice": routed_device,
        "routedScene": routed_scene,
        "routedUdp": routed_udp,
        "events": events[-20:],
    }


if __name__ == "__main__":
    print(json.dumps(asyncio.run(run_e2e_lab()), ensure_ascii=False, indent=2))
