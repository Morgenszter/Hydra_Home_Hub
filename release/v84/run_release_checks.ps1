$ErrorActionPreference = "Stop"
Write-Host "=== HYDRA v8.4 P10 Release Checks ===" -ForegroundColor Cyan

python -m compileall backend
python -m compileall desktop

python backend\tests\hydra_v84_p5_backend_smoke.py
python backend\tests\hydra_v84_p6_smoke.py
python backend\tests\hydra_v84_p7_loader_smoke.py
python backend\tests\hydra_v84_p8_gui_effects_smoke.py
python backend\tests\hydra_v84_p9_v85_smoke.py
python backend\tests\hydra_v84_p10_release_smoke.py

Write-Host "HYDRA v8.4 P10 release checks passed." -ForegroundColor Green

python backend\tests\hydra_v84_p13_consolidation_smoke.py
