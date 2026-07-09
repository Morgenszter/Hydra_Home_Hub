# HYDRA v7.4 — Release Checklist

## Windows Bridge
- [ ] `python -m compileall backend`
- [ ] `python scripts/hydra_v70_smoke.py`
- [ ] `python backend/tests/hydra_e2e_lab_v63.py`
- [ ] `python backend/tests/hydra_live_integration_v69_smoke.py`
- [ ] `python backend/tests/hydra_operator_v73_smoke.py`

## Android HUD
- [ ] Recovery screen wired into main HUD route
- [ ] offline storage adapter verified on device
- [ ] bridge reconnect / replay tested
- [ ] HUD degraded banner tested

## Toolchain
- [ ] `/toolchain/status`
- [ ] `/toolchain/intent/parse`
- [ ] `/toolchain/knowledge/export`

## Packaging
- [ ] final source zip exported
- [ ] Windows build notes attached
- [ ] Android build notes attached
