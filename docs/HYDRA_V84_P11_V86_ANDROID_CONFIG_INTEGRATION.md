# HYDRA v8.4 P11 — V86 Android Config Integration

## Source
- `HYDRA_V86_ANDROID_CONFIG_PATCH.zip`

## Integrated
- `app.json`
- `eas.json`
- `src/config/hydraAndroidConfig.ts`
- `assets/android/icon.png`
- `assets/android/adaptive-icon.png`
- `assets/android/splash.png`
- `scripts/build_android.bat`
- `scripts/build_android.ps1`

## Canonical corrections applied
The original patch targeted `http://192.168.1.100:5000`.
HYDRA canonical backend uses:

- `http://<host>:8765`
- `ws://<host>:8765/ws/runtime`

So P11 normalizes:
- `defaultBridgeUrl` → `http://192.168.1.100:8765`
- `defaultBridgeWsUrl` → `ws://192.168.1.100:8765/ws/runtime`

## Bootstrap integration
- `src/app/hydraAndroidSettings.ts` now consumes `HYDRA_ANDROID_CONFIG`
- `HydraAndroidBootstrap.tsx` uses `HYDRA_ANDROID_CONFIG.bootDurationMs`

## Copied files
```json
{
  "app.json": true,
  "eas.json": true,
  "README_PL.md": true,
  "HYDRA_V86_ANDROID_CONFIG_REPORT.json": true,
  "src/config/hydraAndroidConfig.ts": true,
  "scripts/build_android.bat": true,
  "scripts/build_android.ps1": true,
  "assets/android/icon.png": true,
  "assets/android/adaptive-icon.png": true,
  "assets/android/splash.png": true
}
```
