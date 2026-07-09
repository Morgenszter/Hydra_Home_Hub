# HYDRA v4.1.1 — test plan Existing HUD Patch

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. HUD

Otwórz MainHUD.

Oczekiwane:
- panel `EXISTING HUD PATCH REPORT`
- lista wykrytych plików albo komunikat o braku.

## 3. Wrappery

Jeśli wygenerowano `*Fx.tsx`, zaimportuj wrapper zamiast oryginału w jednym miejscu.

Oczekiwane:
- UI renderuje się jak wcześniej,
- prop `fx` jest opcjonalny,
- brak regresji.

## 4. Fallback

Bez żadnego `fx` wrapper działa jak oryginał.

## 5. Następny komponent

Po zatwierdzeniu:
- patch `Radar` jako pierwszy,
- potem `Console`,
- potem `DeviceStatus`.
