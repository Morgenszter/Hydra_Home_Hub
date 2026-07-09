$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
$env:PYTHONPATH = $ProjectRoot

$PythonExe = "python"
if (Test-Path ".venv\Scripts\python.exe") {
  $PythonExe = ".\.venv\Scripts\python.exe"
}

& $PythonExe -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
