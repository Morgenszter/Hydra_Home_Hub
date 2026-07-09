# HYDRA v8.4 P19 — Win11 Mainline

Android is parked. This pack focuses on the main HYDRA runtime:

- Win11 backend / bridge
- desktop operator
- native voice boundary
- LAN HTTP + WebSocket endpoints
- Win11 source distribution

## Canonical Win11 commands

Open PowerShell in the project root:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\win11_install_deps_p19.ps1
.\scripts\win11_smoke_p19.ps1
.\scripts\win11_start_backend_p19.ps1
```

Open a second PowerShell:

```powershell
.\scripts\win11_start_operator_p19.ps1
```

Fallback panel only:

```powershell
.\scripts\win11_open_operator_panel_p19.ps1
```

Build Win11 source distribution:

```powershell
.\scripts\win11_build_dist_p19.ps1
```

## Backend endpoints

```txt
GET  /health
GET  /health/full
GET  /operator/status
POST /operator/action
GET  /live/state
POST /live/event
GET  /native-voice/status
POST /native-voice/start
POST /native-voice/mic/start
GET  /native-voice/mic/status
POST /native-voice/mic/stop
WS   /ws/runtime
```

## LAN

Backend must be started with:

```powershell
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

Allow firewall:

```powershell
New-NetFirewallRule -DisplayName "HYDRA Backend 8765" -Direction Inbound -Protocol TCP -LocalPort 8765 -Action Allow
```

## Status

This is the Win11 mainline pack. Android files remain in the repo, but they are not part of the P19 critical path.
