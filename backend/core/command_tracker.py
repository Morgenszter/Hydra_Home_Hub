from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from typing import Any, Dict, Optional

@dataclass
class CommandRecord:
    command_id: str
    device_id: Optional[str]
    scene_id: Optional[str]
    command: str
    status: str = "RECEIVED"
    created_at: float = field(default_factory=time.time)
    updated_at: float = field(default_factory=time.time)
    params: Dict[str, Any] = field(default_factory=dict)
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

    def mark(self, status: str, result: dict | None = None, error: str | None = None):
        self.status = status
        self.updated_at = time.time()
        self.result = result
        self.error = error

    def to_dict(self) -> dict:
        return {
            "commandId": self.command_id,
            "deviceId": self.device_id,
            "sceneId": self.scene_id,
            "command": self.command,
            "status": self.status,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
            "params": self.params,
            "result": self.result,
            "error": self.error,
        }

class CommandTracker:
    def __init__(self):
        self.records: dict[str, CommandRecord] = {}

    def create(self, command: str, device_id: str | None = None, scene_id: str | None = None, params: dict | None = None) -> CommandRecord:
        record = CommandRecord(
            command_id=str(uuid.uuid4()),
            device_id=device_id,
            scene_id=scene_id,
            command=command,
            params=params or {},
        )
        self.records[record.command_id] = record
        return record

    def get(self, command_id: str) -> CommandRecord | None:
        return self.records.get(command_id)

    def all(self) -> list[dict]:
        return [record.to_dict() for record in self.records.values()]
