# HYDRA v4.0.1 — test plan Real HUD Bindings

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. Start HUD

Oczekiwane:
- sekcja `REAL HUD BINDINGS`
- status panel
- radar FX
- console FX
- kafle urządzeń.

## 3. Command event

Wyślij poprawną komendę.

Oczekiwane:
- console severity normal
- flash bar reaguje
- status ACTIVE/READY.

## 4. Scene event

Uruchom scenę.

Oczekiwane:
- radar intensity rośnie
- scene mode aktywny.

## 5. Offline event

Wywołaj błąd/offline.

Oczekiwane:
- status critical
- device tile focused/critical
- czerwone akcenty.

## 6. Theme lock

Zablokuj motyw.

Oczekiwane:
- bound komponenty używają session theme.
