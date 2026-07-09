# HYDRA v4.1 — Safe Component Patch

## Cel

Dodać bezpieczne, opcjonalne propsy FX dla realnych komponentów HUD bez łamania istniejących wywołań.

## Dodane kontrakty FX

- `HydraRadarComponentFx`
- `HydraConsoleComponentFx`
- `HydraDeviceComponentFx`

## Dodane komponenty patched

- `HydraPatchedRadar`
- `HydraPatchedConsoleLog`
- `HydraPatchedDeviceStatus`

Każdy komponent przyjmuje opcjonalne `fx?: ...`, więc może działać zarówno:
- bez integracji z HYDRA FX,
- jak i w pełnym trybie `Session + Theme + VisualFX`.

## Panel integracyjny

- `HydraV41ComponentPatchPanel`

Pokazuje użycie patched komponentów z realnymi bindingami:
- radar ← `radarFx`
- console ← `consoleFx`
- device status ← `bindHydraDeviceTileFx(...)`

## Dlaczego tak

To jest bezpieczny etap przejściowy przed patchowaniem konkretnych istniejących plików `Radar.tsx`, `ConsoleLog.tsx`, `DeviceStatus.tsx` po analizie ich aktualnego API.
