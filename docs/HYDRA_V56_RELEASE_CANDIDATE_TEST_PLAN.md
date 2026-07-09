# HYDRA v5.6 Release Candidate — Test Plan

## Backend compile
```bash
python -m compileall backend
```

## Run bridge
```bash
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

## Voice simulate
```bash
curl http://localhost:8765/voice/status
curl -X POST http://localhost:8765/voice/simulate -H "Content-Type: application/json" -d "{\"text\":\"OMEGON\"}"
```

## UDP fast path
```bash
curl -X POST http://localhost:8765/udp/fire -H "Content-Type: application/json" -d "{\"host\":\"127.0.0.1\",\"port\":9999,\"commandType\":\"PING_DEVICE\",\"target\":\"local\"}"
```

## HUD
- sprawdź frame binding
- sprawdź event reactions
- sprawdź texture frame rendering
- sprawdź pairing panel
