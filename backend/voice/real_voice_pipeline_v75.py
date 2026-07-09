from __future__ import annotations

import time
from typing import Any

from backend.core.hydra_command_router_v62 import HydraCommandRouterV62
from backend.voice.voice_intent_parser_v75 import HydraVoiceIntentParserV75


class HydraRealVoicePipelineV75:
    def __init__(self):
        self.parser = HydraVoiceIntentParserV75()
        self.router = HydraCommandRouterV62()
        self.running = False
        self.high_risk_commands = {"panic_stop", "scene.red_alert"}
        self.low_confidence_threshold = 0.55
        self.command_cooldown_seconds = 1.5
        self.cooldown_until: float | None = None
        self.last_routed_command = None
        self.last_rejected_command = None
        self.voice_decisions: list[dict[str, Any]] = []

    def start(self) -> dict[str, Any]:
        self.running = True
        return self.status()

    def stop(self) -> dict[str, Any]:
        self.running = False
        return self.status()

    async def accept_transcript(self, text: str, confidence: float = 1.0, source: str = "voice") -> dict[str, Any]:
        now = time.time()
        intent = self.parser.parse(text, confidence)
        if confidence < self.low_confidence_threshold or intent.get("intentConfidence", 0.0) < 0.5:
            event = {"type": "VOICE_COMMAND_REJECTED", "reason": "LOW_CONFIDENCE", "intent": intent, "source": source, "timestamp": now}
            self.last_rejected_command = event
            self._remember(event)
            return event

        if self.cooldown_until and now < self.cooldown_until:
            event = {"type": "VOICE_COMMAND_REJECTED", "reason": "COOLDOWN", "intent": intent, "source": source, "timestamp": now}
            self.last_rejected_command = event
            self._remember(event)
            return event

        route = self.router.route(intent.get("command"), intent.get("target"), intent.get("value"), source)
        self.cooldown_until = now + self.command_cooldown_seconds
        event = {"type": "VOICE_COMMAND_ROUTED", "intent": intent, "route": route, "source": source, "timestamp": now}
        self.last_routed_command = event
        self._remember(event)
        return event

    def status(self) -> dict[str, Any]:
        return {
            "running": self.running,
            "cooldownUntil": self.cooldown_until,
            "lastRoutedCommand": self.last_routed_command,
            "lastRejectedCommand": self.last_rejected_command,
            "recentVoiceDecisions": self.voice_decisions[-50:],
        }

    def _remember(self, event: dict[str, Any]) -> None:
        self.voice_decisions.append(event)
        self.voice_decisions = self.voice_decisions[-200:]
