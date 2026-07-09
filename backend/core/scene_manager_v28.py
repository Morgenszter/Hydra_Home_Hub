from __future__ import annotations

import asyncio
from backend.core.command_tracker import CommandTracker
from backend.core.event_protocol import EventBus, HydraEvent

class SceneManagerV28:
    def __init__(self, device_manager, event_bus: EventBus, command_tracker: CommandTracker, scenes: dict):
        self.device_manager = device_manager
        self.event_bus = event_bus
        self.command_tracker = command_tracker
        self.scenes = scenes

    def list_scenes(self) -> list[dict]:
        return list(self.scenes.values())

    async def execute_scene(self, scene_id: str) -> dict:
        scene = self.scenes.get(scene_id)
        record = self.command_tracker.create(command=f"scene:{scene_id}", scene_id=scene_id)

        if not scene:
            record.mark("FAILED", error="SCENE_NOT_FOUND")
            self.event_bus.emit(HydraEvent(
                type="SCENE_FAILED",
                source="scene_manager",
                severity="error",
                command_id=record.command_id,
                scene_id=scene_id,
                message="Nie znaleziono sceny.",
            ))
            return record.to_dict()

        self.event_bus.emit(HydraEvent(
            type="SCENE_STARTED",
            source="scene_manager",
            command_id=record.command_id,
            scene_id=scene_id,
            message=f"Scena uruchomiona: {scene['name']}",
            payload=scene,
        ))

        steps = scene.get("steps", [])
        mode = scene.get("mode", "sequential")
        results = []

        try:
            if mode == "parallel":
                results = await asyncio.gather(*[
                    self._execute_step(record.command_id, scene_id, index, step)
                    for index, step in enumerate(steps)
                ])
            else:
                for index, step in enumerate(steps):
                    results.append(await self._execute_step(record.command_id, scene_id, index, step))

            record.mark("COMPLETED", result={"steps": results})
            self.event_bus.emit(HydraEvent(
                type="SCENE_COMPLETED",
                source="scene_manager",
                command_id=record.command_id,
                scene_id=scene_id,
                message=f"Scena zakończona: {scene['name']}",
                payload={"steps": results},
            ))
            return record.to_dict()
        except Exception as exc:
            record.mark("FAILED", error=str(exc))
            self.event_bus.emit(HydraEvent(
                type="SCENE_FAILED",
                source="scene_manager",
                severity="error",
                command_id=record.command_id,
                scene_id=scene_id,
                message="Scena przerwana.",
                payload={"error": str(exc)},
            ))
            return record.to_dict()

    async def _execute_step(self, parent_command_id: str, scene_id: str, index: int, step: dict) -> dict:
        self.event_bus.emit(HydraEvent(
            type="SCENE_STEP_STARTED",
            source="scene_manager",
            command_id=parent_command_id,
            scene_id=scene_id,
            device_id=step["deviceId"],
            message=f"Krok sceny #{index + 1} rozpoczęty.",
            payload=step,
        ))
        result = await self.device_manager.execute(step["deviceId"], step["command"], step.get("params", {}))
        if result.get("status") != "COMPLETED":
            self.event_bus.emit(HydraEvent(
                type="SCENE_STEP_FAILED",
                source="scene_manager",
                severity="error",
                command_id=parent_command_id,
                scene_id=scene_id,
                device_id=step["deviceId"],
                message=f"Krok sceny #{index + 1} nie powiódł się.",
                payload={"result": result},
            ))
            raise RuntimeError(f"SCENE_STEP_FAILED:{index}:{step['deviceId']}")
        self.event_bus.emit(HydraEvent(
            type="SCENE_STEP_COMPLETED",
            source="scene_manager",
            command_id=parent_command_id,
            scene_id=scene_id,
            device_id=step["deviceId"],
            message=f"Krok sceny #{index + 1} zakończony.",
            payload={"result": result},
        ))
        return result
