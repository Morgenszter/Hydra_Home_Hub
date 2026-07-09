# HYDRA v8.4 P6 — Release QA

## Voice
- `GET /native-voice/status`
- `POST /native-voice/start`
- `POST /native-voice/mic/start`
- `GET /native-voice/mic/status`
- `POST /native-voice/mic/stop`
- verify config diagnostics show model paths
- verify fallback mode is explicit when models/libs are absent

## Windows
- run `release/v84/build_windows.ps1`
- verify `dist/HYDRA_Win64`
- verify `config/voice.v84.json`
- optionally run PyInstaller specs

## Android
- run `release/v84/build_android.ps1`
- verify TypeScript
- follow `ANDROID_RELEASE_CHECKLIST.md`

## E2E
- backend `/health/full`
- Android connects `/ws/runtime`
- operator action `/operator/action`
- native voice transcript route
