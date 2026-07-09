# HYDRA v3.7 — test plan Theme Engine + Visual FX

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. Uruchom aplikację

Otwórz `MainHUD`.

Oczekiwane:
- `THEME ENGINE`
- `VISUAL FX`
- `KONSOLA PROTOKOŁU`
- `SILNIK ANIMACJI`
- `GŁOS HYDRA`

## 3. Test automatycznej zmiany motywu

### Success
Wyślij poprawną komendę.
Oczekiwane:
- theme przechodzi do `green`

### Warning
Wygeneruj warning.
Oczekiwane:
- theme przechodzi do `night_ops`

### Error
Wygeneruj błąd lub offline.
Oczekiwane:
- theme przechodzi do `red_alert`

### Scene start
Uruchom scenę.
Oczekiwane:
- theme przechodzi do `blue`

## 4. Test blokady motywu

Kliknij `ZABLOKUJ BIEŻĄCY MOTYW`.

Oczekiwane:
- kolejne eventy nie zmieniają theme mode.

Kliknij `ODBLOKUJ AUTO-THEME`.

Oczekiwane:
- eventy znowu sterują motywem.

## 5. Test Visual FX

Wyślij serię komend.

Oczekiwane:
- `VISUAL FX` pokazuje zmianę poziomów:
  - glow
  - radar
  - flash
  - alert

## 6. Granica odpowiedzialności

Ta iteracja nie narzuca implementacji animacji Twoim komponentom.
Dostarcza gotowe wartości sterujące, które możesz podpiąć do:
- `AnimatedBorder`
- `Radar`
- `GlowText`
- `CommandConsole`
- `StatusIndicator`
