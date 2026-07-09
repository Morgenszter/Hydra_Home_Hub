from __future__ import annotations

import asyncio
import base64
import threading
import time
from dataclasses import dataclass, asdict
from typing import Awaitable, Callable


AudioFrameSink = Callable[[str, int, int], Awaitable[dict]]


@dataclass
class HydraMicrophoneRuntimeStatusV84:
    running: bool
    fallbackMode: bool
    sampleRate: int
    channels: int
    framesCaptured: int
    framesForwarded: int
    lastFrameAt: float | None
    errors: list[str]


class HydraMicrophoneRuntimeV84:
    """
    Dependency-safe microphone runtime.

    Real mode uses sounddevice when available. In fallback mode it starts/stops cleanly
    and exposes diagnostics, but captures no real microphone audio.
    """

    def __init__(
        self,
        sink: AudioFrameSink | None = None,
        sample_rate: int = 16000,
        channels: int = 1,
        blocksize: int = 1600,
    ):
        self.sink = sink
        self.sample_rate = sample_rate
        self.channels = channels
        self.blocksize = blocksize
        self.running = False
        self.fallback_mode = True
        self.frames_captured = 0
        self.frames_forwarded = 0
        self.last_frame_at: float | None = None
        self.errors: list[str] = []
        self._thread: threading.Thread | None = None
        self._stop_event = threading.Event()

    def start(self) -> dict:
        if self.running:
            return self.status()
        self.running = True
        self._stop_event.clear()
        self._thread = threading.Thread(target=self._worker_loop, name="hydra-mic-runtime", daemon=True)
        self._thread.start()
        return self.status()

    def stop(self) -> dict:
        self.running = False
        self._stop_event.set()
        if self._thread and self._thread.is_alive():
            self._thread.join(timeout=2)
        return self.status()

    def status(self) -> dict:
        return asdict(HydraMicrophoneRuntimeStatusV84(
            running=self.running,
            fallbackMode=self.fallback_mode,
            sampleRate=self.sample_rate,
            channels=self.channels,
            framesCaptured=self.frames_captured,
            framesForwarded=self.frames_forwarded,
            lastFrameAt=self.last_frame_at,
            errors=self.errors[-10:],
        ))

    def _worker_loop(self) -> None:
        try:
            import sounddevice as sd  # type: ignore
            self.fallback_mode = False

            def callback(indata, frames, time_info, status):
                if status:
                    self.errors.append(str(status))
                    self.errors[:] = self.errors[-50:]
                try:
                    pcm16 = bytes(indata)
                    self._forward_frame(pcm16)
                except Exception as exc:
                    self.errors.append(str(exc))
                    self.errors[:] = self.errors[-50:]

            with sd.RawInputStream(
                samplerate=self.sample_rate,
                channels=self.channels,
                dtype="int16",
                blocksize=self.blocksize,
                callback=callback,
            ):
                while not self._stop_event.is_set():
                    time.sleep(0.05)
        except Exception as exc:
            self.fallback_mode = True
            self.errors.append(f"sounddevice unavailable or microphone failed: {exc}")
            self.errors[:] = self.errors[-50:]
            while not self._stop_event.is_set() and self.running:
                time.sleep(0.2)

    def _forward_frame(self, pcm16: bytes) -> None:
        self.frames_captured += 1
        self.last_frame_at = time.time()
        if not self.sink:
            return

        payload = base64.b64encode(pcm16).decode("utf-8")
        try:
            try:
                loop = asyncio.get_running_loop()
                loop.create_task(self.sink(payload, self.sample_rate, self.channels))
                self.frames_forwarded += 1
            except RuntimeError:
                asyncio.run(self.sink(payload, self.sample_rate, self.channels))
                self.frames_forwarded += 1
        except Exception as exc:
            self.errors.append(str(exc))
            self.errors[:] = self.errors[-50:]
