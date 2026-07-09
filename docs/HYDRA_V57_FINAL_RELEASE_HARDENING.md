# HYDRA v5.7 — Final Release Hardening

## Cel

Domknięcie roadmapy do stanu release-ready dla:

```txt
HYDRA_WIN11_X64
HYDRA_ANDROID.apk
```

## Dodane

### Windows
- `release/win11/build_win11_x64.ps1`
- `release/win11/run_hydra_bridge_release.bat`
- `release/win11/HYDRA_WIN11_README.txt`

### Android
- `release/android/build_android_apk.ps1`
- `release/android/HYDRA_ANDROID_RELEASE_README.md`

### Release
- `release/HYDRA_RELEASE_MANIFEST_V57.json`
- `release/APPLY_PATCHES_ORDER.md`

## Roadmapa domknięta

- v5.0 Packaging + Pairing + Discovery
- v5.1 WebSocket Hardening + Event Replay
- v5.2 HUD Visual Integration
- v5.2.1 Frame Binding Engine
- v5.2.2 Event-driven HUD
- v5.3 OMEGON Voice Core scaffold
- v5.4 UDP Fast Path HMAC
- v5.6 Release Candidate
- v5.7 Final Release Hardening

## Komendy

### Backend dev

```bash
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

### Win11 release

```powershell
.\release\win11\build_win11_x64.ps1
```

### Android release

```powershell
.\release\android\build_android_apk.ps1
```
