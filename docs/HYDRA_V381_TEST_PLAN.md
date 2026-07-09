# HYDRA v3.8.1 — test plan

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. Theme authority

1. Uruchom HUD.
2. Kliknij `RED_ALERT` w Theme Engine.
3. Sprawdź `SESSION ORCHESTRATOR`.

Oczekiwane:
- `THEME = RED_ALERT LOCK`
- Visual FX używa czerwonego motywu.

## 3. Alert state

Wyślij błędną komendę.

Oczekiwane:
- `ALERT = WARNING / ACTIVE`
- critical banner widoczny.

## 4. Offline state

Zasymuluj `DEVICE_OFFLINE`.

Oczekiwane:
- `mode = OFFLINE`
- `ALERT = CRITICAL / ACTIVE`
- scene launch zablokowane.

## 5. Scene state

Uruchom scenę.

Oczekiwane:
- `SCENE = starting/running`
- po zakończeniu `lastCompletedSceneId` aktualizuje się.

## 6. Command state

Wyślij komendę na Lotus.

Oczekiwane:
- `COMMAND = received / ack / running / completed`

## 7. Recovery plan

Wymuś błąd.

Oczekiwane:
- recovery plan aktywny,
- widoczne kroki,
- `NASTĘPNY KROK RECOVERY` przesuwa plan.
