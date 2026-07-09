from __future__ import annotations

import re
from dataclasses import dataclass, asdict
from typing import Any


DEVICE_ALIASES = {
    "lights": ["światło", "światła", "lampa", "lampy", "led", "ledy"],
    "generator": ["generator", "agregat"],
    "heater": ["grzejnik", "grzanie", "temperatura", "ogrzewanie"],
}
ACTION_ALIASES = {
    "on": ["włącz", "uruchom", "odpal"],
    "off": ["wyłącz", "zgaś", "zatrzymaj"],
    "set_temperature": ["ustaw temperaturę", "ustaw na", "temperatura"],
}
SCENE_ALIASES = {
    "scene.red_alert": ["czerwony alert", "red alert", "alarm czerwony"],
}
HIGH_RISK_ALIASES = {
    "panic_stop": ["panic stop", "awaryjne zatrzymanie", "zatrzymaj wszystko"],
}

@dataclass
class HydraVoiceIntentV75:
    text: str
    confidence: float
    command: str | None
    target: str | None
    value: Any | None
    intentConfidence: float
    matchedBy: str
    highRisk: bool = False


class HydraVoiceIntentParserV75:
    def parse(self, text: str, confidence: float = 1.0) -> dict[str, Any]:
        normalized = self._normalize(text)
        if not normalized:
            return asdict(HydraVoiceIntentV75(text, confidence, None, None, None, 0.0, "empty"))

        for cmd, aliases in HIGH_RISK_ALIASES.items():
            if any(alias in normalized for alias in aliases):
                return asdict(HydraVoiceIntentV75(text, confidence, cmd, None, None, 0.95, "high_risk_alias", True))

        for cmd, aliases in SCENE_ALIASES.items():
            if any(alias in normalized for alias in aliases):
                return asdict(HydraVoiceIntentV75(text, confidence, cmd, None, None, 0.95, "scene_alias", True))

        device = self._detect_device(normalized)
        action = self._detect_action(normalized)
        temperature = self._extract_temperature(normalized)

        if device == "heater" and temperature is not None:
            return asdict(HydraVoiceIntentV75(text, confidence, "setTemperature", device, temperature, 0.9, "temperature_slot"))

        if device and action in {"on", "off"}:
            return asdict(HydraVoiceIntentV75(text, confidence, "setPower", device, action == "on", 0.86, "device_action"))

        return asdict(HydraVoiceIntentV75(text, confidence, None, None, None, 0.2, "unknown"))

    def _normalize(self, text: str) -> str:
        return re.sub(r"\s+", " ", (text or "").strip().lower())

    def _detect_device(self, normalized: str) -> str | None:
        for device, aliases in DEVICE_ALIASES.items():
            if any(alias in normalized for alias in aliases):
                return device
        return None

    def _detect_action(self, normalized: str) -> str | None:
        for action, aliases in ACTION_ALIASES.items():
            if any(alias in normalized for alias in aliases):
                return action
        return None

    def _extract_temperature(self, normalized: str) -> int | None:
        m = re.search(r"(\d{1,2})", normalized)
        return int(m.group(1)) if m else None
