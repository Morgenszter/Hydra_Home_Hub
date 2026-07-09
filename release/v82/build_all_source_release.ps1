$ErrorActionPreference = "Stop"
Write-Host "=== HYDRA v8.2 Source Release Build ===" -ForegroundColor Cyan

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

python -m compileall backend
python scripts\hydra_v70_smoke.py
python backend\tests\hydra_v78_execution_smoke.py
python backend\tests\hydra_v82_final_smoke.py

Write-Host "HYDRA source release checks passed." -ForegroundColor Green
