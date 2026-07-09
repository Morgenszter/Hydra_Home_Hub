# HYDRA v6.9 — Live Integration Pass

## Cel

Podpiąć warstwy v6.4–v6.8 do jednego live runtime flow.

## Dodane

### Backend
- `HydraLiveIntegrationV69`
- `/live/state`
- `/live/events`
- `/live/event`
- `TrayBridgeClientV69`

### Android
- `hydraOfflineStorage.ts`
- `useHydraOfflineRecovery.ts`

## Funkcje

- live event → runtime state patch
- tray client może pobierać health/tray/runtime snapshot
- Android ma storage adapter dla offline cockpit state
- recovery stage może być zapisany lokalnie

## Endpointy testowe

```bash
curl http://localhost:8765/live/state
curl http://localhost:8765/live/events
curl -X POST http://localhost:8765/live/event -H "Content-Type: application/json" -d "{\"type\":\"VOICE_WAKE\",\"payload\":{\"text\":\"OMEGON\"}}"
```
