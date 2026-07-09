$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
$env:PYTHONPATH = $ProjectRoot

$PythonExe = "python"
if (Test-Path ".venv\Scripts\python.exe") {
  $PythonExe = ".\.venv\Scripts\python.exe"
}

& $PythonExe -m compileall backend
& $PythonExe -m compileall desktop
& $PythonExe backend\tests\hydra_v84_p19_win11_mainline_smoke.py
