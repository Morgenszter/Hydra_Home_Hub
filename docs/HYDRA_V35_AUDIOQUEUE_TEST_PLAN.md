# HYDRA v3.5 — test plan AudioQueue / MP3

## Cel

Sprawdzić, że eventy HYDRA generują komunikaty głosowe i że kolejka nigdy nie odtwarza dwóch komunikatów jednocześnie.

## 1. TypeScript

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. Backend

```bash
cd backend
python -m pip install -r requirements.txt
python -m backend.api.main_v28
```

Oczekiwane:
- `/health` działa,
- `/events/history` działa.

## 3. HUD

Uruchom aplikację i otwórz `MainHUD`.

Oczekiwane:
- widoczna `KONSOLA PROTOKOŁU`,
- widoczny panel `GŁOS HYDRA`.

## 4. Komenda ACK/COMPLETED

Wyślij komendę:

```bash
curl -X POST http://localhost:8765/devices/lotus_ble_main/command \
  -H "Content-Type: application/json" \
  -d '{"command":"setColor","params":{"color":"#ff0000","brightness":100}}'
```

Oczekiwane:
- w konsoli pojawia się ACK i COMPLETED,
- panel głosu dostaje kolejkę,
- komunikaty idą po kolei.

## 5. Błąd

```bash
curl -X POST http://localhost:8765/devices/unknown/command \
  -H "Content-Type: application/json" \
  -d '{"command":"setPower","params":{"on":true}}'
```

Oczekiwane:
- `COMMAND_FAILED`,
- tekst: `Błąd protokołu` albo wariant błędu,
- brak crasha UI.

## 6. MP3

W tej paczce manifest głosów działa tekstowo, a pola `asset` są opcjonalne.

Aby dodać prawdziwe MP3:
1. dodaj pliki do `assets/voice/`,
2. w `src/audio/hydraVoiceManifest.ts` ustaw:
   ```ts
   asset: require("../../assets/voice/ack_01.mp3")
   ```
3. uruchom aplikację.

## 7. Mute

Kliknij `MUTE`.

Oczekiwane:
- kolejka nadal przyjmuje komunikaty,
- audio przechodzi w fallback,
- UI nie blokuje się.
