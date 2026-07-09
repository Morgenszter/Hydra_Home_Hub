# HYDRA v3.9 — Voice Personality Engine

## Dodane

- `HydraVoicePersonalityEngine`
- `hydraVoiceCatalog`
- `hydraVoiceRules`
- `hydraVoicePriority`
- `hydraVoiceCooldowns`
- `useHydraVoicePersonality`

## Architektura

```txt
HydraEvent + HydraSessionState
  ↓
HydraVoicePersonalityEngine
  ├─ category resolver
  ├─ priority resolver
  ├─ cooldown filter
  ├─ device-aware catalog
  ├─ scene-aware catalog
  └─ interruption logic
  ↓
HydraAudioQueueEngine
```

## Device-aware phrases

- Lotus → sektor świetlny
- Tapo → oświetlenie taktyczne
- Heater → sektor termiczny

## Scene-aware phrases

- red_alert → ton alarmowy
- night_ops → ton taktyczny
- sector_heat → ton techniczny

## Cooldowny

- ACK: 3500 ms
- COMPLETED: 2500 ms
- OFFLINE: 6000 ms
- CRITICAL: 1200 ms

## Interruption

Priorytet >= 90 jest traktowany jako krytyczny i trafia na początek kolejki.
