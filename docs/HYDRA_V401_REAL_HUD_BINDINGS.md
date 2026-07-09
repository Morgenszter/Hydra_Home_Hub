# HYDRA v4.0.1 — Real HUD Binding Pass

## Cel

Podpiąć Design Bindings do realnych elementów HUD bez ryzykownego przepisywania istniejącego design systemu.

## Dodane komponenty

- `BoundHydraStatusPanel`
- `BoundHydraRadar`
- `BoundHydraConsole`
- `BoundHydraDeviceTile`
- `HydraRealHudBindingsPanel`

## Integracja

`HydraProtocolHudPanel` pokazuje teraz:
- diagnostykę bindingów,
- status związany z sesją,
- radar sterowany `useHydraRadarFx`,
- konsolę sterowaną `useHydraConsoleFx`,
- kafle urządzeń sterowane `useHydraDeviceTileFx` przez `bindHydraDeviceTileFx`.

## Jak podpiąć pod właściwy design system

Przykład dla istniejącego `Radar`:

```tsx
const radarFx = useHydraRadarFx(visualFx.state, session.state, palette);

<Radar
  sweepIntensity={radarFx.sweepIntensity}
  sweepSpeed={radarFx.sweepSpeed}
  radarColor={radarFx.radarColor}
  alertMode={radarFx.alertMode}
/>
```

Przykład dla `DeviceTile`:

```tsx
const tileFx = useHydraDeviceTileFx(device, visualFx.state, session.state, palette);

<DeviceTile
  device={device}
  glowLevel={tileFx.glowLevel}
  statusColor={tileFx.statusColor}
  borderPulse={tileFx.borderPulse}
  isCritical={tileFx.isCritical}
/>
```

## Następny etap

v4.1 powinien wejść głębiej:
- patch konkretnych istniejących komponentów `Radar.tsx`, `ConsoleLog.tsx`, `DeviceStatus.tsx`,
- ale tylko po analizie ich aktualnych propsów, żeby nie złamać UI.
