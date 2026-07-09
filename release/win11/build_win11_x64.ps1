$ErrorActionPreference = "Stop"

Write-Host "=== HYDRA Win11 x64 Release Build ===" -ForegroundColor Cyan

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (!(Test-Path ".venv")) {
  Write-Host "Creating Python virtual environment..." -ForegroundColor Yellow
  py -3 -m venv .venv
}

& .\.venv\Scripts\python.exe -m pip install --upgrade pip
& .\.venv\Scripts\python.exe -m pip install -r backend\requirements_v50.txt
& .\.venv\Scripts\python.exe -m pip install pyinstaller

Write-Host "Compiling backend..." -ForegroundColor Yellow
& .\.venv\Scripts\python.exe -m compileall backend

Write-Host "Building PyInstaller onedir package..." -ForegroundColor Yellow
& .\.venv\Scripts\pyinstaller.exe packaging\win11\hydra_bridge_v50.spec --clean --noconfirm

Write-Host "Copying release assets..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path dist\HYDRA_WIN11_X64\models | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_WIN11_X64\config | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_WIN11_X64\logs | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_WIN11_X64\assets | Out-Null

if (Test-Path "src\assets\hud\alpha_legion\HYDRA_Alpha_Legion_icon_01_512.png") {
  Copy-Item "src\assets\hud\alpha_legion\HYDRA_Alpha_Legion_icon_01_512.png" "dist\HYDRA_WIN11_X64\assets\hydra_icon.png" -Force
}

Copy-Item "release\win11\run_hydra_bridge_release.bat" "dist\HYDRA_WIN11_X64\run_hydra_bridge_release.bat" -Force
Copy-Item "release\win11\HYDRA_WIN11_README.txt" "dist\HYDRA_WIN11_X64\README.txt" -Force

Compress-Archive -Path dist\HYDRA_WIN11_X64 -DestinationPath dist\HYDRA_WIN11_X64_RELEASE.zip -Force

Write-Host "DONE: dist\HYDRA_WIN11_X64_RELEASE.zip" -ForegroundColor Green
