from __future__ import annotations

import hashlib
import hmac
import json
import socket
import time
import uuid
from dataclasses import dataclass, asdict
from typing import Literal


UdpCommandType = Literal["RED_ALERT", "ALL_LIGHTS_ON", "GENERATOR_OFF", "PANIC_STOP", "PING_DEVICE"]


@dataclass
class HydraUdpPacketV54:
    packet_id: str
    command_type: str
    target: str
    timestamp: float
    ttl_ms: int
    payload: dict
    hmac_hex: str


class UdpFastPathV54:
    def __init__(self, secret: str, default_ttl_ms: int = 1500):
        self.secret = secret.encode("utf-8")
        self.default_ttl_ms = default_ttl_ms
        self.sent_packets: list[HydraUdpPacketV54] = []

    def build_packet(
        self,
        command_type: UdpCommandType,
        target: str,
        payload: dict | None = None,
        ttl_ms: int | None = None,
    ) -> HydraUdpPacketV54:
        packet_payload = {
            "packet_id": str(uuid.uuid4()),
            "command_type": command_type,
            "target": target,
            "timestamp": time.time(),
            "ttl_ms": ttl_ms or self.default_ttl_ms,
            "payload": payload or {},
        }
        signature = self.sign(packet_payload)
        return HydraUdpPacketV54(**packet_payload, hmac_hex=signature)

    def sign(self, packet_payload: dict) -> str:
        canonical = json.dumps(packet_payload, sort_keys=True, separators=(",", ":")).encode("utf-8")
        return hmac.new(self.secret, canonical, hashlib.sha256).hexdigest()

    def verify(self, packet: HydraUdpPacketV54) -> bool:
        now = time.time()
        age_ms = (now - packet.timestamp) * 1000
        if age_ms > packet.ttl_ms:
            return False
        payload = asdict(packet)
        signature = payload.pop("hmac_hex")
        return hmac.compare_digest(signature, self.sign(payload))

    def send(self, host: str, port: int, packet: HydraUdpPacketV54) -> None:
        raw = json.dumps(asdict(packet), ensure_ascii=False).encode("utf-8")
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        try:
            sock.sendto(raw, (host, port))
            self.sent_packets.append(packet)
            self.sent_packets = self.sent_packets[-500:]
        finally:
            sock.close()
