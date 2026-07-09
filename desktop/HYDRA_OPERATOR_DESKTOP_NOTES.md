# HYDRA Desktop Operator UI — v7.8 Execution Notes

## Current state
- backend operator action layer exists
- tray bindings exist
- React Native companion operator screen exists

## Next native Win11 desktop step
Recommended stack:
- Python backend remains bridge/orchestrator
- desktop shell: Tauri or Electron OR pywebview wrapper around local HUD/operator frontend
- tray menu should expose:
  - Pairing
  - Restart bridge
  - Restart discovery
  - Emergency red alert
  - Open logs
  - Open operator panel
