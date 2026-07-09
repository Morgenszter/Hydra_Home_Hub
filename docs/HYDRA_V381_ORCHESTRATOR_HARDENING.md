# HYDRA v3.8.1 — Orchestrator Hardening

## Cel

Usztywnienie rdzenia sesji przed Voice Personality Engine.

## Zrobione

### 1. Unified Theme Authority

`HydraSessionOrchestrator` jest teraz jedynym źródłem prawdy dla:
- `themeMode`
- `themeLocked`

`HydraProtocolHudPanel` używa:
```ts
hydraThemes[session.state.themeMode]
```

### 2. Bogatszy stan sesji

Dodano:
- `alertState`
- `sceneState`
- `commandState`
- `deviceFocus`

### 3. Recovery Plan

Zamiast prostego enumu recovery dodano:
- `HydraRecoveryPlan`
- `HydraRecoveryStep[]`
- `retryBudget`
- `currentStepIndex`

### 4. Panel sesji 2.0

`HydraSessionPanel` pokazuje:
- theme lock
- alert state
- command state
- scene state
- device focus
- recovery plan
- manual mode override
- advance recovery step

## Następny etap

v3.9 — Voice Personality Engine powinien korzystać z:
- `session.mode`
- `session.alertState`
- `session.sceneState`
- `session.commandState`
- `session.deviceFocus`
- `session.voicePriority`
- `session.hudGate.suppressLowPriorityAudio`
