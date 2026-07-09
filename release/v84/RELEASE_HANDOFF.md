# HYDRA v8.4 — Release Handoff

## Canonical master
Use this package as the current source base:

```txt
HYDRA_INTELLIGENCE_V84_MASTER_P1_P10_FINAL_PACK.zip
```

## Canonical entrypoints

### Backend
```txt
backend.api.asgi_v51:app
```

### Android
```txt
src/app/HydraAndroidBootstrap.tsx
```

### Desktop operator
```txt
desktop/operator_shell/hydra_tray_app.py
desktop/operator_shell/hydra_operator_shell.py
```

### Voice
```txt
backend/voice/native_voice_integration_v79.py
backend/voice/microphone_runtime_v84.py
```

## Required final production assets
```txt
models/vosk-pl/
models/openwakeword/omegon.onnx
config/voice.v84.json
assets/loading/
assets/gui-effects/
assets/v85-gui/
```

## Build order
1. Run backend smoke.
2. Run release checks.
3. Prepare Win11 source distribution.
4. Add voice models.
5. Optionally run PyInstaller specs.
6. Build Android APK/AAB using project RN environment.
7. Run E2E tests.
