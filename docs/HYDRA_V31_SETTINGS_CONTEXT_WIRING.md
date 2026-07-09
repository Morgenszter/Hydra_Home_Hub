# HYDRA v3.1 — Settings + Context Wiring

Wykonane:
- dodano `HydraBridgeCompat`
- dodano helper `hydraDeviceActions`
- wpięto albo przygotowano `HydraBridgeSettingsPanel`
- opakowano `App` w `HydraBridgeProvider`, jeśli struktura pliku pozwalała na bezpieczną automatyczną modyfikację
- zachowano backupy `.bak` dla modyfikowanych plików

Wykryty ekran Settings:
```txt
src/screens/Settings.tsx
```

Wykryty plik App:
```txt
App.tsx
```

## Jak używać w HUD

```ts
const hydra = useHydraBridgeContext();

await hydra.sendCommand("lotus_ble_main", "setColor", {
  color: "#ff0000",
  brightness: 100,
});

await hydra.runScene("red_alert");
```

## Adapter UX

Warstwa UX nadal powinna reagować na eventy, nie na wewnętrzne adaptery backendu.
