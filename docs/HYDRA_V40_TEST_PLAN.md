# HYDRA v4.0 — test plan Design Bindings

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. HUD bindings

Uruchom HUD.

Oczekiwane:
- widoczny panel `DESIGN BINDINGS`
- wartości zmieniają się przy eventach.

## 3. Radar binding

Uruchom scenę.

Oczekiwane:
- `RADAR` sweep intensity rośnie
- speed przechodzi na tryb sceny.

## 4. Console binding

Wyślij komendę.

Oczekiwane:
- `CONSOLE` pokazuje normal/warning/critical zależnie od eventu.

## 5. Alert binding

Wymuś błąd.

Oczekiwane:
- status `ALERT`
- alert overlay > 0
- kolor krytyczny.

## 6. DeviceTile binding

Podłącz hook do kafla urządzenia.

Oczekiwane:
- focused device ma glow
- offline device ma critical status.

## 7. Theme lock

Zablokuj theme.

Oczekiwane:
- bindingi używają session theme authority.
