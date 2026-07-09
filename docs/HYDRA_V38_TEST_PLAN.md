# HYDRA v3.8 — test plan Session Orchestrator

## 1. Kompilacja

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. Backend

```bash
cd backend
python -m backend.api.main_v28
```

## 3. Start HUD

Oczekiwane:
- panel `SESSION ORCHESTRATOR`
- tryb początkowy `BOOT` albo po eventach `IDLE`

## 4. Command flow

Wyślij poprawną komendę.

Oczekiwane przejścia:
- `COMMAND_RECEIVED` → `COMMAND`
- `COMMAND_COMPLETED` → `IDLE`

## 5. Scene flow

Uruchom `red_alert`.

Oczekiwane:
- `SCENE_STARTED` → `SCENE`
- `SCENE_COMPLETED` → `IDLE`

## 6. Offline flow

Wyślij komendę do nieznanego urządzenia albo zasymuluj `DEVICE_OFFLINE`.

Oczekiwane:
- session mode `OFFLINE` albo `ALERT`
- `showCriticalBanner=true`
- `allowSceneLaunch=false`
- recovery action aktywne

## 7. Manual override

W panelu sesji kliknij:
- `IDLE`
- `SCENE`
- `ALERT`
- `OFFLINE`
- `RECOVERY`

Oczekiwane:
- panel zmienia tryb
- HUD nie crashuje
- theme/visual state pozostaje spójny
