from __future__ import annotations

import queue
import threading
import time
from dataclasses import dataclass, asdict
from typing import Callable


@dataclass
class OmegonAudioRuntimeState:
    running: bool
    wake_window_open: bool
    last_chunk_at: float | None
    last_transcript_at: float | None


class OmegonAudioRuntimeV66:
    def __init__(self, on_transcript: Callable[[str, float], None] | None = None):
        self.on_transcript = on_transcript
        self.running = False
        self.last_chunk_at: float | None = None
        self.last_transcript_at: float | None = None
        self._queue: queue.Queue[tuple[str, float]] = queue.Queue()
        self._thread: threading.Thread | None = None

    def start(self):
        if self.running:
            return self.state()
        self.running = True
        self._thread = threading.Thread(target=self._loop, daemon=True, name="hydra-omegon-audio")
        self._thread.start()
        return self.state()

    def stop(self):
        self.running = False
        return self.state()

    def push_transcript(self, text: str, confidence: float = 1.0):
        self._queue.put((text, confidence))
        self.last_chunk_at = time.time()

    def _loop(self):
        while self.running:
            try:
                text, confidence = self._queue.get(timeout=0.1)
            except queue.Empty:
                continue
            self.last_transcript_at = time.time()
            if self.on_transcript:
                self.on_transcript(text, confidence)

    def state(self):
        return asdict(OmegonAudioRuntimeState(
            running=self.running,
            wake_window_open=False,
            last_chunk_at=self.last_chunk_at,
            last_transcript_at=self.last_transcript_at,
        ))
