# HYDRA Android APK Release

## Build

```powershell
.\release\android\build_android_apk.ps1
```

## Output

```txt
android/app/build/outputs/apk/release/app-release.apk
```

## Required permissions

- LAN / network access
- secure storage for pairing token
- foreground cockpit mode recommended for stable WebSocket

## Pairing flow

1. PC starts `HYDRA Bridge`.
2. PC opens `/pairing/open`.
3. Android probes `http://<PC-IP>:8765`.
4. Android claims pairing code.
5. Token is saved in SecureStore.
6. WebSocket connects to `/ws/hud`.

## Emergency mode

If WebSocket disconnects:
- HUD keeps last known state
- reconnect backoff starts
- emergency UDP path can still be used for selected commands
