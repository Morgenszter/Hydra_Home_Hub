# HYDRA v5.4 — UDP Fast Path HMAC

## Dodane
- `UdpFastPathV54`
- `/udp/fire`
- `/udp/sent`

## Pakiet UDP
- packet_id
- command_type
- target
- timestamp
- ttl_ms
- payload
- hmac_hex

## Zasada
UDP tylko do szybkich/idempotentnych komend:
- RED_ALERT
- ALL_LIGHTS_ON
- GENERATOR_OFF
- PANIC_STOP
- PING_DEVICE
