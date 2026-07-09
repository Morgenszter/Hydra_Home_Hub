# HYDRA v3.6 — HUD Animation Engine

Dodano:

```txt
HydraHudSignal
  ↓
HydraAnimationEngine
  ↓
HydraAnimationCommand
  ↓
HydraAnimationStatusPanel
```

Mapowanie:

- success → pulse
- warning → scanline
- error → red_alert
- scene_start → radar_sweep
- scene_done → glow
- log → scanline low intensity

Dzięki temu `Protocol Engine` steruje już trzema torami:

```txt
Event → HUD Console
Event → Audio Queue
Event → Animation Queue
```
