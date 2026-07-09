$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot

if (!(Test-Path ".venv")) {
  python -m venv .venv
}

.\.venv\Scripts\python.exe -m pip install --upgrade pip
.\.venv\Scripts\python.exe -m pip install -r backend\requirements_win11_mainline.txt
.\.venv\Scripts\python.exe -m compileall backend
.\.venv\Scripts\python.exe -m compileall desktop

$DistRoot = "dist\HYDRA_Win11_Mainline"
if (Test-Path $DistRoot) {
  Remove-Item -Recurse -Force $DistRoot
}
New-Item -ItemType Directory -Force -Path $DistRoot | Out-Null
New-Item -ItemType Directory -Force -Path "$DistRoot\logs" | Out-Null
New-Item -ItemType Directory -Force -Path "$DistRoot\config" | Out-Null
New-Item -ItemType Directory -Force -Path "$DistRoot\models" | Out-Null

Copy-Item -Recurse -Force backend "$DistRoot\backend"
Copy-Item -Recurse -Force desktop "$DistRoot\desktop"
Copy-Item -Recurse -Force scripts "$DistRoot\scripts"
Copy-Item -Recurse -Force release "$DistRoot\release"
if (Test-Path "assets") { Copy-Item -Recurse -Force assets "$DistRoot\assets" }
if (Test-Path "config\voice.v84.example.json") { Copy-Item -Force config\voice.v84.example.json "$DistRoot\config\voice.v84.json" }
Copy-Item -Force README_WIN11_MAINLINE_P19.md "$DistRoot\README_WIN11_MAINLINE_P19.md"

Write-Host "HYDRA Win11 mainline dist ready: $DistRoot" -ForegroundColor Green
