# HYDRA v3.9 — test plan Voice Personality Engine

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. ACK

Wyślij komendę do Lotus.

Oczekiwane:
- komunikat ACK z katalogu światła albo generic ACK.

## 3. Heater completed

Wyślij komendę temperatury.

Oczekiwane:
- komunikat dotyczący sektora termicznego.

## 4. Red alert scene

Uruchom `red_alert`.

Oczekiwane:
- komunikat sceniczny, nie zwykły ACK.

## 5. Offline

Zasymuluj `DEVICE_OFFLINE`.

Oczekiwane:
- priorytet krytyczny,
- komunikat trafia na początek kolejki.

## 6. Cooldown

Wyślij kilka ACK z rzędu.

Oczekiwane:
- cooldown blokuje spam.

## 7. Suppression

W trybie `SCENE` zwykłe low-priority audio jest tłumione.

## 8. Unknown event

Nieznany event nie crashuje engine.
