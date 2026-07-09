# HYDRA v3.8 — Session Orchestrator

## Dodane

- `HydraSessionOrchestrator`
- `hydraSessionState`
- `hydraProtocolPolicies`
- `hydraRecoveryRules`
- `useHydraSessionOrchestrator`
- `HydraSessionPanel`
- integracja z `HydraProtocolHudPanel`

## Tryby sesji

- `BOOT`
- `IDLE`
- `COMMAND`
- `SCENE`
- `ALERT`
- `OFFLINE`
- `RECOVERY`
- `SHUTDOWN`

## Policy priority

```txt
OFFLINE / CRITICAL
ALERT
SCENE
COMMAND
IDLE
```

## Efekt

HYDRA ma teraz jeden centralny stan operacyjny:

```txt
Bridge Event
  ↓
HydraSessionOrchestrator
  ├─ session mode
  ├─ theme mode
  ├─ voice priority
  ├─ HUD gates
  └─ recovery action
```

## Następny etap

v3.9 powinien dodać pełny `Voice Personality Engine`, który skorzysta z:
- `session.mode`
- `voicePriority`
- `activeDeviceId`
- `activeSceneId`
- `hudGate.suppressLowPriorityAudio`
