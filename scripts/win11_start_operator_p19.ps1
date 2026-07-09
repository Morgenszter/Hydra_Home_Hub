$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
$env:PYTHONPATH = $ProjectRoot

$PythonExe = "python"
if (Test-Path ".venv\Scripts\python.exe") {
  $PythonExe = ".\.venv\Scripts\python.exe"
}

& $PythonExe -m desktop.operator_shell.hydra_tray_app
