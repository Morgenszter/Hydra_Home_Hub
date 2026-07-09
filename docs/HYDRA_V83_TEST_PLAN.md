# HYDRA v8.3 — Test Plan

## Backend canonical boot
```bash
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

## Canonical endpoint tests
```bash
curl http://127.0.0.1:8765/native-voice/status
curl http://127.0.0.1:8765/voice-execution/status
curl http://127.0.0.1:8765/operator/status
curl http://127.0.0.1:8765/toolchain/status
curl http://127.0.0.1:8765/runtime/state
curl http://127.0.0.1:8765/live/state
```

## Smoke scripts
```bash
python backend/tests/hydra_v82_final_smoke.py
python backend/tests/hydra_v78_execution_smoke.py
python backend/tests/hydra_voice_pipeline_v75_smoke.py
python backend/tests/hydra_operator_v73_smoke.py
python scripts/hydra_v70_smoke.py
```

## Android
- render `HydraAndroidBootstrap`
- switch cockpit/operator
- verify recovery banner
- verify operator actions
