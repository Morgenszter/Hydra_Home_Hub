# HYDRA v3.0 — test plan frontend ↔ backend

## 1. Start backendu

```bash
cd backend
python -m pip install -r requirements.txt
python -m backend.api.main_v28
```

Oczekiwane:
- backend działa na `http://localhost:8765`,
- `/health` zwraca `ok: true`.

## 2. Test API z terminala

```bash
curl http://localhost:8765/health
curl http://localhost:8765/devices
curl http://localhost:8765/scenes
```

Oczekiwane:
- 3 urządzenia,
- 3 sceny,
- brak błędów.

## 3. Test aplikacji mobilnej

W ekranie ustawień / panelu `HydraBridgeSettingsPanel` ustaw:

- Android emulator: `http://10.0.2.2:8765`
- iOS simulator: `http://localhost:8765`
- telefon fizyczny: `http://IP_KOMPUTERA:8765`

Kliknij `PING`.

Oczekiwane:
- status `ONLINE`,
- licznik urządzeń `3`,
- licznik scen `3`.

## 4. Test komendy

Z poziomu hooka:

```ts
await hydra.sendCommand("lotus_ble_main", "setColor", {
  color: "#ff0000",
  brightness: 100,
});
```

Oczekiwane eventy:
- `COMMAND_RECEIVED`
- `COMMAND_ACK`
- `COMMAND_IN_PROGRESS`
- `DEVICE_STATE_CHANGED`
- `COMMAND_COMPLETED`

## 5. Test sceny

```ts
await hydra.runScene("red_alert");
```

Oczekiwane eventy:
- `SCENE_STARTED`
- `SCENE_STEP_STARTED`
- `SCENE_STEP_COMPLETED`
- `SCENE_COMPLETED`

## 6. Test błędu

```ts
await hydra.sendCommand("unknown", "setPower", { on: true });
```

Oczekiwane:
- `COMMAND_FAILED`,
- komunikat po polsku,
- aplikacja nie crashuje.

## 7. Test trwałej konfiguracji

1. Ustaw bridge URL.
2. Zamknij aplikację.
3. Otwórz ponownie.
4. Sprawdź, czy URL został zapamiętany.

Oczekiwane:
- `AsyncStorage` ładuje ostatni URL,
- fallback memory storage działa w środowisku bez AsyncStorage.

## 8. Granica UX

Ten etap nie uruchamia audio ani animacji.

Zdarzenia są gotowe do mapowania przez:
- Voice Personality Engine,
- Audio Queue,
- Theme Engine,
- Animation Engine,
- Protocol Engine.
