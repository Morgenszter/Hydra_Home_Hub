# HYDRA v4.0 — Hook Design Bindings

## Cel

Połączyć `Session + Theme + VisualFX` z konkretnymi propsami dla komponentów HUD bez nadpisywania design systemu.

## Dodane hooki

- `useHydraHudFx`
- `useHydraRadarFx`
- `useHydraConsoleFx`
- `useHydraDeviceTileFx`
- `useHydraStatusFx`

## Dodany moduł

- `src/theme/HydraDesignBindings.ts`

## Dodany panel diagnostyczny

- `HydraDesignBindingsPanel`

## Przykład użycia

```ts
const radarFx = useHydraRadarFx(visualFx.state, session.state, palette);

<Radar
  sweepIntensity={radarFx.sweepIntensity}
  sweepSpeed={radarFx.sweepSpeed}
  radarColor={radarFx.radarColor}
  alertMode={radarFx.alertMode}
/>
```

## Mapowanie

- `DEVICE_OFFLINE` → critical device tile
- `SCENE_STARTED` → radar sweep
- `COMMAND_ACK` → console flash
- `COMMAND_COMPLETED` → success glow
- `ALERT` → red border / overlay
- `night_ops` → taktyczny przyciemniony HUD

## Granica odpowiedzialności

v4.0 nie zastępuje istniejących komponentów. Dostarcza warstwę propsów, którą można podpiąć do:
- HUDButton
- HUDCard
- Radar
- AnimatedBorder
- GlowText
- StatusIndicator
- CommandConsole
- DeviceTile
- ProgressRing
