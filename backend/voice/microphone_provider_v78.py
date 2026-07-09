from __future__ import annotations

from dataclasses import dataclass
from typing import Any


@dataclass
class MicrophoneChunk:
    pcm16: bytes
    sample_rate: int
    channels: int


class HydraMicrophoneProviderV78:
    """
    Execution-pass boundary for real microphone capture.
    Safe fallback in source pack: push external PCM chunks into `feed_chunk`.
    """

    def __init__(self):
        self.running = False
        self.recent_chunks = 0

    def start(self) -> dict[str, Any]:
        self.running = True
        return self.status()

    def stop(self) -> dict[str, Any]:
        self.running = False
        return self.status()

    def feed_chunk(self, chunk: MicrophoneChunk) -> dict[str, Any]:
        self.recent_chunks += 1
        return {
            "accepted": True,
            "bytes": len(chunk.pcm16),
            "sampleRate": chunk.sample_rate,
            "channels": chunk.channels,
        }

    def status(self) -> dict[str, Any]:
        return {
            "running": self.running,
            "recentChunks": self.recent_chunks,
        }
