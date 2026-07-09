# HYDRA v6.5 — Android Offline Cache + Recovery Layer

## Dodane
- `src/mobile/offline/hydraOfflineState.ts`

## Model
- sessionState
- deviceStates
- alertState
- sceneState
- recentEvents
- hudReactions
- lastConnectedBridge
- trustedPairingInfo
- lastSuccessfulSyncAt
- connectionStage

## Recovery state machine
DISCONNECTED → PROBING → PAIRING_REQUIRED → CONNECTING → CONNECTED → DEGRADED → REPLAYING → READY
