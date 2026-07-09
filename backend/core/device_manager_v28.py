from __future__ import annotations

from typing import Any
from backend.core.command_tracker import CommandTracker
from backend.core.device_contracts import HydraDevice
from backend.core.event_protocol import EventBus, HydraEvent

class DeviceManagerV28:
    def __init__(self, event_bus: EventBus, command_tracker: CommandTracker):
        self.event_bus = event_bus
        self.command_tracker = command_tracker
        self.devices: dict[str, HydraDevice] = {}
        self.adapters: dict[str, Any] = {}

    def register_device(self, device: HydraDevice, adapter: Any) -> None:
        self.devices[device.id] = device
        self.adapters[device.id] = adapter
        self.event_bus.emit(HydraEvent(
            type="DEVICE_REGISTERED",
            source="device_manager",
            device_id=device.id,
            message=f"Urządzenie zarejestrowane: {device.name}",
            payload=device.to_dict(),
        ))

    def list_devices(self) -> list[dict]:
        return [device.to_dict() for device in self.devices.values()]

    async def execute(self, device_id: str, command: str, params: dict | None = None) -> dict:
        params = params or {}
        record = self.command_tracker.create(command=command, device_id=device_id, params=params)
        self.event_bus.emit(HydraEvent(
            type="COMMAND_RECEIVED",
            source="api",
            command_id=record.command_id,
            device_id=device_id,
            message=f"Rozkaz odebrany: {command}",
            payload={"params": params},
        ))

        device = self.devices.get(device_id)
        adapter = self.adapters.get(device_id)

        if not device or not adapter:
            record.mark("FAILED", error="DEVICE_NOT_FOUND")
            self.event_bus.emit(HydraEvent(
                type="COMMAND_FAILED",
                source="device_manager",
                severity="error",
                command_id=record.command_id,
                device_id=device_id,
                message="Nie znaleziono urządzenia.",
                payload={"errorCode": "DEVICE_NOT_FOUND"},
            ))
            return record.to_dict()

        self.event_bus.emit(HydraEvent(
            type="COMMAND_ACK",
            source="device_manager",
            command_id=record.command_id,
            device_id=device_id,
            message="Rozkaz przyjęty.",
        ))
        record.mark("IN_PROGRESS")
        self.event_bus.emit(HydraEvent(
            type="COMMAND_IN_PROGRESS",
            source="device_manager",
            command_id=record.command_id,
            device_id=device_id,
            message="Wykonuję rozkaz.",
        ))

        try:
            result = await adapter.execute(command, params)
            self._sync_device_state(device_id, result)
            record.mark("COMPLETED", result=result)
            self.event_bus.emit(HydraEvent(
                type="DEVICE_STATE_CHANGED",
                source="adapter",
                command_id=record.command_id,
                device_id=device_id,
                message="Stan urządzenia zaktualizowany.",
                payload={"state": device.to_dict()["state"], "adapterResult": result},
            ))
            self.event_bus.emit(HydraEvent(
                type="COMMAND_COMPLETED",
                source="device_manager",
                command_id=record.command_id,
                device_id=device_id,
                message="Rozkaz wykonany.",
                payload={"result": result},
            ))
            return record.to_dict()
        except Exception as exc:
            device.state.online = False
            device.state.last_error = str(exc)
            record.mark("FAILED", error=str(exc))
            self.event_bus.emit(HydraEvent(
                type="DEVICE_OFFLINE",
                source="adapter",
                severity="warning",
                command_id=record.command_id,
                device_id=device_id,
                message="Utracono kontakt z urządzeniem.",
                payload={"error": str(exc)},
            ))
            self.event_bus.emit(HydraEvent(
                type="COMMAND_FAILED",
                source="device_manager",
                severity="error",
                command_id=record.command_id,
                device_id=device_id,
                message="Rozkaz nie został wykonany.",
                payload={"error": str(exc)},
            ))
            return record.to_dict()

    def _sync_device_state(self, device_id: str, result: dict) -> None:
        device = self.devices[device_id]
        state = result.get("state", result)
        device.state.online = bool(state.get("online", True))
        if "power" in state:
            device.state.power = bool(state["power"])
        if "brightness" in state:
            device.state.brightness = state["brightness"]
        if "color" in state:
            device.state.color = state["color"]
        if "temperature" in state:
            device.state.temperature = state["temperature"]
        if "targetTemperature" in state:
            device.state.target_temperature = state["targetTemperature"]
        if "mode" in state:
            device.state.mode = state["mode"]
        device.state.last_error = None
