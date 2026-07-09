# HYDRA v8.4 P13 — Step-by-step Release Runbook

## 1. Prepare Win11

```powershell
cd <HYDRA_ROOT>
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r backend\requirements_v50.txt
```

If optional desktop/voice dependencies are available:

```powershell
python -m pip install pystray pywebview pillow sounddevice vosk
```

## 2. Run smoke tests

```powershell
python -m compileall backend
python -m compileall desktop
python backend\tests\hydra_v84_p5_backend_smoke.py
python backend\tests\hydra_v84_p6_smoke.py
python backend\tests\hydra_v84_p10_release_smoke.py
python backend\tests\hydra_v84_p12_android_release_smoke.py
python backend\tests\hydra_v84_p13_consolidation_smoke.py
```

## 3. Start backend

```powershell
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

## 4. Verify backend

```powershell
curl http://127.0.0.1:8765/health
curl http://127.0.0.1:8765/health/full
curl http://127.0.0.1:8765/operator/status
curl http://127.0.0.1:8765/live/state
curl http://127.0.0.1:8765/native-voice/status
```

## 5. Start desktop operator

```powershell
python desktop\operator_shell\hydra_tray_app.py
```

Fallback: open:

```txt
desktop/operator_shell/panel_assets/index.html
```

## 6. Voice test

Minimum integration test:

```powershell
curl -X POST http://127.0.0.1:8765/native-voice/start
curl -X POST http://127.0.0.1:8765/native-voice/transcript -H "Content-Type: application/json" -d "{\"text\":\"włącz światło\",\"confidence\":0.95}"
curl -X POST http://127.0.0.1:8765/native-voice/mic/start
curl http://127.0.0.1:8765/native-voice/mic/status
curl -X POST http://127.0.0.1:8765/native-voice/mic/stop
```

## 7. Android build handoff

```powershell
scripts\build_android.ps1
```

Then, in a configured Expo/EAS environment:

```powershell
npx eas build -p android --profile preview
npx eas build -p android --profile production
```

## 8. Android runtime config

Set:

```txt
API: http://<WIN11_IP>:8765
WS:  ws://<WIN11_IP>:8765/ws/runtime
```

## 9. Android acceptance

- cold boot
- loader appears
- cockpit renders
- operator renders
- alpha renders
- persisted host survives restart
- operator action reaches backend
- backend restart triggers reconnect

## 10. Win11 distribution

```powershell
release\v84\build_windows.ps1
```

Verify:

```txt
dist/HYDRA_Win64/
```

## 11. Final soak

Run for 30–60 minutes:

- backend
- Android app connected
- desktop panel open
- repeated operator actions
- live event posts
- mic start/stop if voice dependencies exist
