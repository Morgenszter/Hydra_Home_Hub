from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional

@dataclass
class DeviceCapabilities:
    power: bool = True
    brightness: bool = False
    color: bool = False
    temperature: bool = False
    modes: List[str] = field(default_factory=list)

@dataclass
class DeviceState:
    online: bool = False
    power: bool = False
    brightness: Optional[int] = None
    color: Optional[str] = None
    temperature: Optional[float] = None
    target_temperature: Optional[float] = None
    mode: Optional[str] = None
    last_error: Optional[str] = None

@dataclass
class HydraDevice:
    id: str
    name: str
    kind: str
    protocol: str
    room: str
    capabilities: DeviceCapabilities
    state: DeviceState = field(default_factory=DeviceState)
    metadata: Dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "name": self.name,
            "kind": self.kind,
            "protocol": self.protocol,
            "room": self.room,
            "capabilities": {
                "power": self.capabilities.power,
                "brightness": self.capabilities.brightness,
                "color": self.capabilities.color,
                "temperature": self.capabilities.temperature,
                "modes": self.capabilities.modes,
            },
            "state": {
                "online": self.state.online,
                "power": self.state.power,
                "brightness": self.state.brightness,
                "color": self.state.color,
                "temperature": self.state.temperature,
                "targetTemperature": self.state.target_temperature,
                "mode": self.state.mode,
                "lastError": self.state.last_error,
            },
            "metadata": self.metadata,
        }
