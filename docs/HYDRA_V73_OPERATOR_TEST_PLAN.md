# HYDRA v7.3 — Operator Desktop Test Plan

## Backend
```bash
python -m compileall backend
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

## Endpointy
```bash
curl http://localhost:8765/operator/status
curl -X POST http://localhost:8765/operator/start
curl -X POST http://localhost:8765/operator/action -H "Content-Type: application/json" -d "{\"action\":\"emergency_red_alert\"}"
```

## Oczekiwane
- operator shell startuje
- action endpoint zwraca wrapped result
- da się spiąć z tray bindings
