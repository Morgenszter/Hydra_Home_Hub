# HYDRA v3.3 — Event Router + HUD/Audio/Protocol Engine

## Zaimplementowany przepływ

```txt
Bridge Event
  ↓
HydraEventRouter
  ↓
HydraHudEventBridge
  ↓
HUD signal / log / pulse / warning / error

Bridge Event
  ↓
HydraEventRouter
  ↓
HydraAudioEventBridge
  ↓
kolejka voice line, nigdy dwa komunikaty naraz

Bridge Event
  ↓
HydraProtocolEngine
  ↓
HUD + Audio + przyszła animacja/theme layer
```

## Dodane pliki

- `src/services/hydraEventRouter.ts`
- `src/services/hydraHudEventBridge.ts`
- `src/services/hydraAudioEventBridge.ts`
- `src/hydraModule/protocol/HydraProtocolEngine.ts`
- `src/hooks/useHydraProtocolEngine.ts`

## Kolejność integracji

1. Eventy → HUD
2. Eventy → AudioQueue
3. Kernel / Protocol Engine jako orkiestrator

## Granica odpowiedzialności

Ten etap nie odtwarza jeszcze MP3. Dostarcza stabilną kolejkę `voiceLines`, którą Twój Audio Queue może obsłużyć jako pojedynczy strumień.

## Przykład

```ts
const hydra = useHydraBridgeContext();
const protocol = useHydraProtocolEngine(hydra.events);

protocol.voiceLines[0]?.text;
protocol.hudSignals[0]?.message;
```
