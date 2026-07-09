# HYDRA v5.2.1 — Frame Binding Engine

## Cel

Zamienić ramki HUD z dekoracji w warstwę funkcyjną.
Silnik decyduje, **która ramka ma zostać użyta** dla:
- dashboardu
- voice/focus card
- command panelu
- telemetry/device panelu

na podstawie:
- alert state
- voice/listening mode
- active scene
- focused device
- viewport mobile / compact / landscape
- poziomu visual FX

## Dodane

- `src/components/hud/hydraFrameBindingEngine.ts`
- `src/hooks/useHydraFrameBinding.ts`
- `src/components/hud/HydraBoundFramePanels.tsx`

## Reguły

### Compact mode
- mały ekran → `wide_compact_ui`

### Voice mode
- voice/listening → `square_serpent_ui`

### Alert mode
- red alert → dashboard `wide_top_bottom_serpents`, focus `square_serpent_ui`

### Device focus
- telemetry → `vertical_serpent_columns`

## Wynik

Engine zwraca:
- `dashboardVariant`
- `focusVariant`
- `commandVariant`
- `telemetryVariant`
- intensity dla każdej sekcji
- compactMode
- listę powodów decyzji
