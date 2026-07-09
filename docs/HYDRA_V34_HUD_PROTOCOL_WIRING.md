# HYDRA v3.4 — HUD Protocol Wiring

## Zrobione

Dodano komponenty:
- `HydraProtocolConsole`
- `HydraVoiceQueuePanel`
- `HydraProtocolHudPanel`

## Integracja

Automatycznie podpięte pliki HUD:
```json
[
  "src/screens/MainHUD.tsx"
]
```

Jeżeli lista jest pusta, dodany został ekran:
```txt
src/screens/HydraProtocolScreen.tsx
```

## Przepływ

```txt
HydraBridgeProvider
  ↓ events
useHydraProtocolEngine
  ↓
HydraProtocolHudPanel
  ├─ HydraProtocolConsole
  └─ HydraVoiceQueuePanel
```

## Uwaga

`HydraVoiceQueuePanel` jeszcze nie odtwarza MP3. To celowe — pokazuje kolejkę i linię głosową, żeby Twój realny AudioQueue mógł przejąć odtwarzanie bez konfliktu.
