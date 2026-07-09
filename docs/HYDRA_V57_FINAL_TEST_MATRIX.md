# HYDRA v5.7 — Final Test Matrix

## A. PC Bridge

| Test | Expected |
|---|---|
| `/health` | ok true |
| `/discovery/payload` | wsUrl + httpUrl |
| `/pairing/open` | 6-digit code |
| `/pairing/claim` | clientId + token |
| `/ws/hud` | accepts paired token |
| `/voice/status` | OMEGON core online |
| `/voice/simulate` OMEGON | VOICE_WAKE event |
| `/udp/fire` | signed packet |
| `/udp/sent` | packet history |

## B. Android HUD

| Test | Expected |
|---|---|
| Probe bridge | discovery payload visible |
| Pair code | token saved |
| WebSocket connect | state OPEN |
| PING | PONG |
| Replay | event list |
| HUD frames | 4 Alpha Legion frames render |
| Frame binding | variants change by state |
| Event reactions | reaction panel logs events |

## C. Reliability

| Test | Expected |
|---|---|
| PC restart | Android reconnects |
| WS drop | reconnect backoff |
| Event during disconnect | replay after reconnect |
| Device offline | red telemetry reaction |
| UDP emergency | signed packet sent |

## D. Release

| Test | Expected |
|---|---|
| Win build script | `dist/HYDRA_WIN11_X64_RELEASE.zip` |
| Android build script | `app-release.apk` |
| Python compile | 0 errors |
| Asset check | icon + 4 frames |
