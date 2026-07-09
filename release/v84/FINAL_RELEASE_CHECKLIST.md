# HYDRA v8.4 — Final Release Checklist

## Backend
- [ ] `python -m compileall backend`
- [ ] `python backend/tests/hydra_v84_p5_backend_smoke.py`
- [ ] `python backend/tests/hydra_v84_p6_smoke.py`
- [ ] `python backend/tests/hydra_v84_p7_loader_smoke.py`
- [ ] `python backend/tests/hydra_v84_p8_gui_effects_smoke.py`
- [ ] `python backend/tests/hydra_v84_p9_v85_smoke.py`
- [ ] `python backend/tests/hydra_v84_p10_release_smoke.py`

## Voice
- [ ] `config/voice.v84.json` exists
- [ ] Vosk PL model exists at configured path
- [ ] OpenWakeWord OMEGON model exists at configured path
- [ ] `/native-voice/status` shows model diagnostics
- [ ] `/native-voice/mic/start` does not crash
- [ ] transcript command path routes

## Win11
- [ ] `release/v84/build_windows.ps1`
- [ ] `dist/HYDRA_Win64` created
- [ ] `config/voice.v84.json` copied
- [ ] `assets/loading` copied
- [ ] `assets/gui-effects` copied
- [ ] `assets/v85-gui` copied
- [ ] PyInstaller bridge spec reviewed
- [ ] PyInstaller operator spec reviewed

## Android
- [ ] `HydraAndroidBootstrap` is root
- [ ] cockpit/operator/alpha modes render
- [ ] bridge WS points to `/ws/runtime`
- [ ] API points to backend `:8765`
- [ ] persisted settings work
- [ ] Android release checklist complete

## E2E
- [ ] backend `/health/full`
- [ ] operator `/operator/action`
- [ ] live `/live/event`
- [ ] websocket `/ws/runtime`
- [ ] Android reconnect
- [ ] desktop operator panel actions
