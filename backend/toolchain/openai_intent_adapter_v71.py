from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass
class IntentParseResult:
    ok: bool
    intent: str
    confidence: float
    target: str | None
    params: dict[str, Any]
    error: str | None = None


class HydraOpenAIIntentAdapterV71:
    """
    Optional online adapter.
    Local command routing remains primary; this adapter is safe to keep disabled.
    """

    def __init__(self, enabled: bool = False):
        self.enabled = enabled

    def parse(self, text: str, locale: str = "pl-PL", context: dict[str, Any] | None = None) -> IntentParseResult:
        if not self.enabled:
            return self._local_fallback(text)

        return self._local_fallback(text, error="OPENAI_RUNTIME_NOT_BOUND_IN_SOURCE_PACK")

    def _local_fallback(self, text: str, error: str | None = None) -> IntentParseResult:
        normalized = text.lower().strip()

        if "czerwony alert" in normalized or "red alert" in normalized:
            return IntentParseResult(True, "scene.red_alert", 0.74, "red_alert", {"sourceText": text}, error)

        if "światło" in normalized or "swiatlo" in normalized or "lights" in normalized:
            off = "wyłącz" in normalized or "wylacz" in normalized or "off" in normalized
            return IntentParseResult(True, "device.power_off" if off else "device.power_on", 0.68, "lights", {"sourceText": text}, error)

        return IntentParseResult(False, "unknown", 0, None, {"sourceText": text}, error or "NO_LOCAL_MATCH")
