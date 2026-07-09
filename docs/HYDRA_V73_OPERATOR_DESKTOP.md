# HYDRA v7.3 — Real Tray / Operator Desktop Scaffold

## Dodane
- `backend/desktop/operator_desktop_v73.py`
- `backend/api/operator_v73.py`
- `backend/api/tray_runtime_bindings_v73.py`

## Funkcje
- operator desktop action layer
- `/operator/status`
- `/operator/start`
- `/operator/stop`
- `/operator/action`
- gotowy punkt pod tray quick actions:
  - open_pairing
  - restart_discovery
  - restart_bridge
  - open_logs
  - emergency_red_alert

## Cel
Spójny operator shell dla Win11 bridge, zamiast samego gołego tray runtime.
