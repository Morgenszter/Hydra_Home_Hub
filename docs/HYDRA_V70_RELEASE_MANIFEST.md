# HYDRA v7.0 — Full Application Build Pack

## Cel
Scalić pełne aplikacje HYDRA Win11 x64 + Android APK w jeden spójny build pack źródłowy, z jednym runtime flow i jedną matrycą testów.

## Zakres scalenia
- v5.0 packaging / pairing / discovery
- v5.2 HUD visual integration
- v5.2.1 frame binding engine
- v5.6 release candidate
- v5.7 final release hardening
- v6.3 auto mode source patch
- v6.8 unified expansion
- v6.9 live integration pass

## Warstwy aplikacji

### Windows / PC Bridge
- FastAPI / Uvicorn backend
- pairing / discovery / websocket bridge
- tray scaffold
- voice runtime scaffold
- live integration event bus
- runtime state store
- UDP fast path

### Android HUD
- HUD UI / 2.5D visual layer
- websocket client
- offline recovery state
- offline storage adapter
- pairing trust + reconnect flow

## Kluczowe foldery
- `backend/` — runtime PC bridge
- `src/` — HUD / mobile app / frontend runtime
- `docs/` — release docs i roadmapy
- `scripts/` — build/test helpers

## Build targets
- Win11 x64 source build
- Android source build
- shared protocol/runtime integration tests
