# HYDRA v8.4 P19 — Win11 Mainline Pack

## Why
Android dependency debugging was blocking the project, while Win11 is the primary HYDRA runtime. P19 parks Android and stabilizes Win11.

## Implemented
- Win11-only dependency install.
- Win11-only smoke test not dependent on FastAPI TestClient.
- Robust backend start.
- Robust operator start via module import.
- Fallback direct HTML panel opener.
- Win11 source distribution builder.
- P13 legacy start scripts now route to P19 scripts.

## Main scripts
- `scripts/win11_install_deps_p19.ps1`
- `scripts/win11_smoke_p19.ps1`
- `scripts/win11_start_backend_p19.ps1`
- `scripts/win11_start_operator_p19.ps1`
- `scripts/win11_open_operator_panel_p19.ps1`
- `scripts/win11_build_dist_p19.ps1`

## Android status
Parked. Not removed. Not in the P19 critical path.
