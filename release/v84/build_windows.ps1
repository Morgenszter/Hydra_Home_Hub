$ErrorActionPreference = "Stop"
Write-Host "=== HYDRA v8.4 Windows Build P6 ===" -ForegroundColor Cyan

if (!(Test-Path ".venv")) {
  python -m venv .venv
}

.\.venv\Scripts\python.exe -m pip install --upgrade pip
if (Test-Path "backend\requirements_v50.txt") {
  .\.venv\Scripts\python.exe -m pip install -r backend\requirements_v50.txt
}
.\.venv\Scripts\python.exe -m pip install pyinstaller pystray pywebview pillow

.\.venv\Scripts\python.exe -m compileall backend
.\.venv\Scripts\python.exe -m compileall desktop

New-Item -ItemType Directory -Force -Path dist\HYDRA_Win64 | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_Win64\config | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_Win64\models | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_Win64\logs | Out-Null
New-Item -ItemType Directory -Force -Path dist\HYDRA_Win64\assets | Out-Null

Copy-Item -Recurse -Force backend dist\HYDRA_Win64\backend
Copy-Item -Recurse -Force desktop dist\HYDRA_Win64\desktop
Copy-Item -Recurse -Force release dist\HYDRA_Win64\release
Copy-Item -Force config\voice.v84.example.json dist\HYDRA_Win64\config\voice.v84.json

Write-Host "Optional binary build:"
Write-Host "  .\.venv\Scripts\pyinstaller.exe release\v84\pyinstaller_bridge.spec"
Write-Host "  .\.venv\Scripts\pyinstaller.exe release\v84\pyinstaller_operator.spec"
Write-Host "HYDRA v8.4 Windows source distribution ready: dist\HYDRA_Win64" -ForegroundColor Green

if (Test-Path "assets\loading") { Copy-Item -Recurse -Force assets\loading dist\HYDRA_Win64\assets\loading }

if (Test-Path "assets\gui-effects") { Copy-Item -Recurse -Force assets\gui-effects dist\HYDRA_Win64\assets\gui-effects }

if (Test-Path "assets\v85-gui") { Copy-Item -Recurse -Force assets\v85-gui dist\HYDRA_Win64\assets\v85-gui }

Copy-Item -Force release\v84\FINAL_RELEASE_CHECKLIST.md dist\HYDRA_Win64\FINAL_RELEASE_CHECKLIST.md
Copy-Item -Force release\v84\FINAL_ARTIFACT_MANIFEST.json dist\HYDRA_Win64\FINAL_ARTIFACT_MANIFEST.json
Copy-Item -Force release\v84\RELEASE_HANDOFF.md dist\HYDRA_Win64\RELEASE_HANDOFF.md
