# HYDRA v8.4 — Final Artifact Structure

## Windows target

```txt
dist/HYDRA_Win64/
  hydra_bridge.exe
  hydra_operator.exe
  backend/
  desktop/
  models/
    vosk-pl/
    openwakeword/
  config/
  logs/
  assets/
```

## Android target

```txt
dist/android/
  HYDRA-HUD-debug.apk
  HYDRA-HUD-release.apk
  HYDRA-HUD-release.aab
```

## Checks

```powershell
release/v84/run_release_checks.ps1
```
