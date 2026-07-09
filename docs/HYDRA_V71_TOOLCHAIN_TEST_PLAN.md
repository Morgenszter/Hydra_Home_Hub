# HYDRA v7.1 — Toolchain Test Plan

## Backend

```bash
python -m compileall backend
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

Sprawdź:

```bash
curl http://localhost:8765/toolchain/status
curl -X POST http://localhost:8765/toolchain/intent/parse -H "Content-Type: application/json" -d "{\"text\":\"OMEGON włącz czerwony alert\"}"
curl http://localhost:8765/toolchain/knowledge/export
```

## Frontend

Sprawdź obecność:
- `src/toolchain/hydraToolchainContracts.ts`
- `src/toolchain/hydraOpenAIIntentAdapter.ts`
- `src/toolchain/hydraDesignTokens.ts`
- `src/toolchain/hydraExternalDataAdapters.ts`

## CI

GitHub Actions:
- backend compile
- v70 smoke
- TypeScript check
