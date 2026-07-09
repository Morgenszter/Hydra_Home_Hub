# HYDRA v8.4 — Code Sprint P5

## Implemented
- `backend/api/operator_v84.py`
- `backend/api/live_ws_v84.py`
- canonical `asgi_v51.py` with:
  - `/health`
  - `/health/full`
  - `/native-voice/*`
  - `/operator/status`
  - `/operator/action`
  - `/live/state`
  - `/live/event`
  - `/ws/runtime`
- Android default WS target updated to `/ws/runtime`
- backend smoke test via FastAPI TestClient

## Why P5 matters
P5 closes the biggest gap from P4: Android and desktop now have backend operator/live endpoints to call.
