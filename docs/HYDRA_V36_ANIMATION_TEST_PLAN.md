# HYDRA v3.6 — test plan HUD Animation Engine

## 1. TypeScript

```bash
npx tsc --noEmit --skipLibCheck
```

Oczekiwane:
- 0 błędów.

## 2. Uruchom backend

```bash
cd backend
python -m backend.api.main_v28
```

## 3. Uruchom HUD

Oczekiwane panele:
- Konsola protokołu
- Silnik animacji
- Głos HYDRA

## 4. Test sukcesu

Wyślij komendę na Lotus:

```bash
curl -X POST http://localhost:8765/devices/lotus_ble_main/command \
  -H "Content-Type: application/json" \
  -d '{"command":"setColor","params":{"color":"#00ffaa","brightness":80}}'
```

Oczekiwane:
- `COMMAND_ACK` → log/audio
- `COMMAND_COMPLETED` → animacja `pulse`

## 5. Test sceny

```bash
curl -X POST http://localhost:8765/scenes/red_alert
```

Oczekiwane:
- `SCENE_STARTED` → `radar_sweep`
- `SCENE_COMPLETED` → `glow`
- błędy → `red_alert`

## 6. Test kolejki animacji

Wyślij kilka komend szybko.

Oczekiwane:
- animacje ustawiają się w kolejce,
- jedna aktywna animacja naraz,
- przycisk `SKIP` przechodzi do następnej.

## 7. Granica warstw

Ta iteracja nie narzuca konkretnych animacji wizualnych na cały design system.
Dostarcza komendy animacji, które można podłączyć do Twojego:
- AnimatedBorder,
- Radar Sweep,
- Scanline,
- Boot Animation,
- Theme Engine.
