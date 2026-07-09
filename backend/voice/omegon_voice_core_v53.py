from __future__ import annotations

import json
import queue
import threading
import time
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import Callable, Iterable


@dataclass
class OmegonVoiceEvent:
    event_id: str
    type: str
    text: str
    confidence: float
    timestamp: float
    latency_ms: float


class OmegonVoiceCoreV53:
    """
    Local-first voice core scaffold.

    Runtime strategy:
    1. Wake-word engine: OpenWakeWord / Porcupine / future native module.
    2. Short command recognition: Vosk Small PL after wake.
    3. Output: HYDRA bridge event, not synthesized speech.

    This class is dependency-safe: it compiles and runs without Vosk/OpenWakeWord installed.
    Real engines can be plugged in via `feed_transcript`.
    """

    def __init__(
        self,
        wake_words: Iterable[str] = ("omegon", "omegonie", "omega on"),
        callback: Callable[[OmegonVoiceEvent], None] | None = None,
    ):
        self.wake_words = tuple(word.lower() for word in wake_words)
        self.callback = callback
        self.events: list[OmegonVoiceEvent] = []
        self._running = False
        self._input: queue.Queue[tuple[str, float]] = queue.Queue()
        self._thread: threading.Thread | None = None

    def start(self) -> None:
        if self._running:
            return
        self._running = True
        self._thread = threading.Thread(target=self._loop, daemon=True, name="hydra-omegon-voice-core")
        self._thread.start()

    def stop(self) -> None:
        self._running = False

    def feed_transcript(self, transcript: str, confidence: float = 1.0) -> None:
        self._input.put((transcript, confidence))

    def recent(self, limit: int = 50) -> list[dict]:
        return [asdict(event) for event in self.events[-limit:]]

    def _loop(self) -> None:
        while self._running:
            try:
                transcript, confidence = self._input.get(timeout=0.1)
            except queue.Empty:
                continue
            start = time.time()
            normalized = transcript.lower().strip()
            if any(word in normalized for word in self.wake_words):
                event = OmegonVoiceEvent(
                    event_id=f"voice:{int(time.time() * 1000)}",
                    type="VOICE_WAKE",
                    text=transcript,
                    confidence=confidence,
                    timestamp=time.time(),
                    latency_ms=(time.time() - start) * 1000,
                )
            else:
                event = OmegonVoiceEvent(
                    event_id=f"voice:{int(time.time() * 1000)}",
                    type="VOICE_COMMAND_DETECTED",
                    text=transcript,
                    confidence=confidence,
                    timestamp=time.time(),
                    latency_ms=(time.time() - start) * 1000,
                )
            self.events.append(event)
            self.events = self.events[-500:]
            if self.callback:
                self.callback(event)
