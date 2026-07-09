# HYDRA v7.7 — End-to-End Test Matrix

## Voice
1. POST /voice-pipeline/start
2. POST transcript "OMEGON"
3. POST transcript "włącz czerwony alert"
4. Expect VOICE_WAKE then VOICE_COMMAND_REJECTED/ROUTED with lastIntent scene.red_alert
5. Repeat for generator off, lights on/off, heater temperature

## Runtime / Bridge
1. GET /runtime/state
2. POST /live/event VOICE_WAKE
3. POST /live/event ROUTED_COMMAND_COMPLETED
4. Verify recent_command_routes and voice_state patches

## Operator
1. POST /operator/start
2. POST /operator/action emergency_red_alert
3. POST /operator/action restart_bridge
4. Verify wrapped action result and operator/status

## Android Recovery / HUD
1. Bootstrap with empty cache
2. Receive HYDRA_RUNTIME_SNAPSHOT
3. Verify REPLAYING -> READY
4. Disconnect websocket
5. Verify DEGRADED or DISCONNECTED
6. Reconnect and verify cache replay

## Manual integration
- wire HydraMainCockpitScreen as main HUD route
- wire HydraOperatorScreen as operator route
- connect real backend websocket endpoint to useHydraRuntimeBridge
