# HYDRA v4.1 — test plan Safe Component Patch

## 1. Kompilacja
```bash
npx tsc --noEmit --skipLibCheck
```
Oczekiwane:
- 0 błędów.

## 2. Start HUD
Oczekiwane:
- sekcja `SAFE COMPONENT PATCH`
- radar, console i device status renderują się bez błędów.

## 3. Command ACK
Wyślij komendę.
Oczekiwane:
- console severity = normal
- pasek flash > 0.

## 4. Scene
Uruchom scenę.
Oczekiwane:
- radar sweep rośnie.

## 5. Offline
Wywołaj `DEVICE_OFFLINE`.
Oczekiwane:
- device status staje się krytyczny
- kolor i opacity zmieniają się.

## 6. Fallback bez FX
Wyrenderuj `HydraPatchedRadar` / `HydraPatchedConsoleLog` / `HydraPatchedDeviceStatus` bez prop `fx`.
Oczekiwane:
- komponenty nadal renderują się poprawnie.
