# HYDRA v8.4 P13 — Operational Handoff

## Current status
HYDRA v8.4 P13 is the final consolidated release-candidate source pack for:

- Win11 x64 backend / bridge / operator
- Android HUD companion
- voice runtime boundary
- loader + V85 Alpha Dashboard
- release handoff structure

## Canonical entrypoints

### Backend
```powershell
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

### Android
```txt
src/app/HydraAndroidBootstrap.tsx
```

### Desktop operator
```powershell
python desktop/operator_shell/hydra_tray_app.py
```

### Voice
```txt
backend/voice/native_voice_integration_v79.py
backend/voice/microphone_runtime_v84.py
```

## Canonical endpoints

```txt
HTTP API: http://<WIN11_IP>:8765
WS:       ws://<WIN11_IP>:8765/ws/runtime
```

## Android modes

```txt
cockpit
operator
alpha
```

## Recommended first run order

1. Unzip this release.
2. Run backend smoke tests.
3. Start backend on Win11.
4. Verify health/operator/live/native-voice endpoints.
5. Start desktop operator panel.
6. Build/install Android preview APK.
7. Set API/WS host to Win11 IP.
8. Test cockpit/operator/alpha.
9. Run reconnect test.
10. Run 30–60 minute soak test.

## Conditional production note
This pack is a release-candidate source/handoff pack. Real production PASS still requires:

- real Android APK/AAB build in your RN/EAS environment
- real Win11 source distribution or binary build on Windows
- real voice model paths and mic test
- real LAN/IoT device adapter test if controlling hardware
