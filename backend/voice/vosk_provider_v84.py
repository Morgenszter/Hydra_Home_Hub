from __future__ import annotations

import json
import time
from dataclasses import dataclass, asdict
from typing import Any


@dataclass
class HydraTranscriptResultV84:
    accepted: bool
    isFinal: bool
    text: str | None
    confidence: float
    timestamp: float
    provider: str
    fallbackMode: bool
    error: str | None = None


class HydraVoskProviderV84:
    """
    Dependency-safe Vosk adapter.

    Real Vosk mode activates only when vosk is installed and model_path is configured.
    Fallback mode accepts audio frames but produces no transcript.
    """

    def __init__(self, model_path: str | None = None, sample_rate: int = 16000):
        self.model_path = model_path
        self.sample_rate = sample_rate
        self.running = False
        self.listening = False
        self.fallback_mode = True
        self.model: Any | None = None
        self.recognizer: Any | None = None
        self.session_started_at: float | None = None
        self.last_partial: str | None = None
        self.last_final: str | None = None
        self.total_finals = 0
        self.errors: list[str] = []

    def start(self) -> dict[str, Any]:
        self.running = True
        self._try_load_provider()
        return self.status()

    def stop(self) -> dict[str, Any]:
        self.running = False
        self.listening = False
        return self.status()

    def begin_command_window(self) -> dict[str, Any]:
        self.listening = True
        self.session_started_at = time.time()
        self.last_partial = None
        self.last_final = None
        self._reset_recognizer()
        return self.status()

    def feed_pcm16(self, pcm16: bytes, sample_rate: int = 16000) -> dict[str, Any]:
        if not self.running or not self.listening:
            return asdict(HydraTranscriptResultV84(False, False, None, 0.0, time.time(), "Vosk", self.fallback_mode, "NOT_LISTENING"))

        if self.fallback_mode or self.recognizer is None:
            return asdict(HydraTranscriptResultV84(True, False, None, 0.0, time.time(), "Vosk", True))

        try:
            accepted_final = bool(self.recognizer.AcceptWaveform(pcm16))
            if accepted_final:
                raw = json.loads(self.recognizer.Result() or "{}")
                text = str(raw.get("text") or "").strip()
                confidence = float(raw.get("confidence") or raw.get("conf") or 0.0)
                if text:
                    self.last_final = text
                    self.total_finals += 1
                return asdict(HydraTranscriptResultV84(True, True, text or None, confidence, time.time(), "Vosk", False))

            raw = json.loads(self.recognizer.PartialResult() or "{}")
            partial = str(raw.get("partial") or "").strip()
            if partial and partial != self.last_partial:
                self.last_partial = partial
                return asdict(HydraTranscriptResultV84(True, False, partial, 0.0, time.time(), "Vosk", False))

            return asdict(HydraTranscriptResultV84(True, False, None, 0.0, time.time(), "Vosk", False))
        except Exception as exc:
            self.errors.append(str(exc))
            self.errors = self.errors[-50:]
            return asdict(HydraTranscriptResultV84(False, False, None, 0.0, time.time(), "Vosk", self.fallback_mode, str(exc)))

    def end_command_window(self) -> dict[str, Any]:
        final_text = self.last_final
        if self.recognizer is not None and not self.fallback_mode:
            try:
                raw = json.loads(self.recognizer.FinalResult() or "{}")
                text = str(raw.get("text") or "").strip()
                if text:
                    final_text = text
                    self.last_final = text
                    self.total_finals += 1
            except Exception as exc:
                self.errors.append(str(exc))
                self.errors = self.errors[-50:]

        self.listening = False
        return {
            "listening": self.listening,
            "lastFinal": final_text,
            "status": self.status(),
        }

    def status(self) -> dict[str, Any]:
        session_age_ms = None
        if self.session_started_at is not None:
            session_age_ms = int((time.time() - self.session_started_at) * 1000)

        return {
            "provider": "Vosk",
            "running": self.running,
            "fallbackMode": self.fallback_mode,
            "modelPath": self.model_path,
            "sampleRate": self.sample_rate,
            "listening": self.listening,
            "sessionAgeMs": session_age_ms,
            "lastPartial": self.last_partial,
            "lastFinal": self.last_final,
            "totalFinals": self.total_finals,
            "errors": self.errors[-10:],
        }

    def _try_load_provider(self) -> None:
        try:
            import vosk  # type: ignore
            if not self.model_path:
                self.fallback_mode = True
                self.errors.append("Vosk installed but model_path not configured; fallback mode active.")
                return
            self.model = vosk.Model(self.model_path)
            self.fallback_mode = False
            self._reset_recognizer()
        except Exception as exc:
            self.fallback_mode = True
            self.model = None
            self.recognizer = None
            self.errors.append(f"Vosk unavailable: {exc}")
            self.errors = self.errors[-50:]

    def _reset_recognizer(self) -> None:
        if self.fallback_mode or self.model is None:
            self.recognizer = None
            return
        try:
            import vosk  # type: ignore
            self.recognizer = vosk.KaldiRecognizer(self.model, float(self.sample_rate))
        except Exception as exc:
            self.errors.append(str(exc))
            self.errors = self.errors[-50:]
            self.recognizer = None
