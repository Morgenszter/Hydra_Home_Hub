from __future__ import annotations

import time
from dataclasses import dataclass, asdict
from typing import Any


@dataclass
class HydraWakeWordResultV84:
    wakeDetected: bool
    keyword: str | None
    confidence: float
    timestamp: float
    provider: str
    fallbackMode: bool


class HydraOpenWakeWordProviderV84:
    """
    Dependency-safe OpenWakeWord adapter.

    If openwakeword/model files are not installed, provider remains in fallback mode.
    Fallback mode never produces wake from raw PCM. Manual transcript wake still works via
    native_voice_v79 / voice_execution_runtime_v78.
    """

    def __init__(
        self,
        model_path: str | None = None,
        keyword: str = "OMEGON",
        threshold: float = 0.55,
    ):
        self.model_path = model_path
        self.keyword = keyword
        self.threshold = threshold
        self.running = False
        self.fallback_mode = True
        self.model: Any | None = None
        self.last_wake: float | None = None
        self.last_confidence = 0.0
        self.total_detections = 0
        self.errors: list[str] = []

    def start(self) -> dict[str, Any]:
        self.running = True
        self._try_load_provider()
        return self.status()

    def stop(self) -> dict[str, Any]:
        self.running = False
        return self.status()

    def process_pcm16(self, pcm16: bytes, sample_rate: int = 16000) -> dict[str, Any]:
        if not self.running:
            return asdict(self._result(False, None, 0.0))

        if self.fallback_mode or self.model is None:
            return asdict(self._result(False, None, 0.0))

        try:
            # Provider hook. Real OpenWakeWord integration should transform pcm16 into
            # the expected numpy float32 frame and call the loaded model.
            confidence = 0.0
            detected = confidence >= self.threshold
            if detected:
                self.last_wake = time.time()
                self.last_confidence = confidence
                self.total_detections += 1
            return asdict(self._result(detected, self.keyword if detected else None, confidence))
        except Exception as exc:
            self.errors.append(str(exc))
            self.errors = self.errors[-50:]
            return asdict(self._result(False, None, 0.0))

    def status(self) -> dict[str, Any]:
        return {
            "provider": "OpenWakeWord",
            "running": self.running,
            "fallbackMode": self.fallback_mode,
            "modelPath": self.model_path,
            "keyword": self.keyword,
            "threshold": self.threshold,
            "lastWake": self.last_wake,
            "lastConfidence": self.last_confidence,
            "totalDetections": self.total_detections,
            "errors": self.errors[-10:],
        }

    def _try_load_provider(self) -> None:
        try:
            import openwakeword  # type: ignore  # noqa: F401
            self.fallback_mode = self.model_path is None
            self.model = None
            if self.model_path is None:
                self.errors.append("OpenWakeWord installed but model_path not configured; fallback mode active.")
        except Exception as exc:
            self.fallback_mode = True
            self.model = None
            self.errors.append(f"OpenWakeWord unavailable: {exc}")
            self.errors = self.errors[-50:]

    def _result(self, detected: bool, keyword: str | None, confidence: float) -> HydraWakeWordResultV84:
        return HydraWakeWordResultV84(
            wakeDetected=detected,
            keyword=keyword,
            confidence=confidence,
            timestamp=time.time(),
            provider="OpenWakeWord",
            fallbackMode=self.fallback_mode,
        )
