from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from typing import Any, Dict, Literal, Optional

HydraSeverity = Literal["debug", "info", "warning", "error", "critical"]

@dataclass
class HydraEvent:
    type: str
    message: str
    source: str = "bridge"
    severity: HydraSeverity = "info"
    command_id: Optional[str] = None
    device_id: Optional[str] = None
    scene_id: Optional[str] = None
    payload: Dict[str, Any] = field(default_factory=dict)
    event_id: str = field(default_factory=lambda: str(uuid.uuid4()))
    timestamp: float = field(default_factory=time.time)

    def to_dict(self) -> dict:
        return {
            "eventId": self.event_id,
            "type": self.type,
            "timestamp": self.timestamp,
            "source": self.source,
            "severity": self.severity,
            "message": self.message,
            "commandId": self.command_id,
            "deviceId": self.device_id,
            "sceneId": self.scene_id,
            "payload": self.payload,
        }

class EventBus:
    def __init__(self, max_history: int = 500):
        self.max_history = max_history
        self.history: list[HydraEvent] = []

    def emit(self, event: HydraEvent) -> HydraEvent:
        self.history.append(event)
        if len(self.history) > self.max_history:
            self.history = self.history[-self.max_history:]
        return event

    def recent(self, limit: int = 100) -> list[dict]:
        return [event.to_dict() for event in self.history[-limit:]]
