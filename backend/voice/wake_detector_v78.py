from __future__ import annotations

from dataclasses import dataclass


@dataclass
class WakeDetectionResult:
    detected: bool
    keyword: str | None
    confidence: float


class HydraWakeDetectorV78:
    """
    Local-first wake detector boundary.
    Real provider target: OpenWakeWord / Porcupine.
    Fallback here accepts text hints from upstream transcript runtime.
    """

    def detect_from_text(self, text: str) -> WakeDetectionResult:
        normalized = text.lower()
        if "omegon" in normalized:
            return WakeDetectionResult(True, "OMEGON", 0.99)
        return WakeDetectionResult(False, None, 0.0)
