# HYDRA v8.4 P13 — Final Handoff

## Use this first
Read:

```txt
README_OPERATIONAL_P13.md
release/v84/P13_RUNBOOK_STEP_BY_STEP.md
release/v84/P13_FINAL_RISK_REGISTER.md
```

## First commands

```powershell
scripts\run_p13_smoke.ps1
scripts\start_backend_p13.ps1
```

## Then

```powershell
scripts\start_operator_panel_p13.ps1
scripts\build_android.ps1
release\v84\build_windows.ps1
```

## Release status
Conditional Pass / Release Candidate.

Production confirmation requires real:
- Android build/install
- Win11 dist execution
- voice model/microphone test
- soak test
