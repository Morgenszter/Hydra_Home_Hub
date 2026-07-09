# HYDRA v6.9 — Test Plan

## Python compile

```bash
python -m compileall backend
```

## Backend smoke

```bash
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

## Live event

```bash
curl -X POST http://localhost:8765/live/event \
  -H "Content-Type: application/json" \
  -d "{\"type\":\"VOICE_WAKE\",\"payload\":{\"text\":\"OMEGON\"}}"
```

Expected:
- event returned
- `/live/state` voice_state updated

## Android offline storage

Expected exports:
- `loadHydraOfflineState`
- `saveHydraOfflineState`
- `patchHydraOfflineState`
- `setHydraConnectionStage`
- `useHydraOfflineRecovery`
