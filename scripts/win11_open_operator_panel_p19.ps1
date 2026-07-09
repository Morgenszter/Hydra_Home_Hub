$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $ProjectRoot
Start-Process "$ProjectRoot\desktop\operator_shell\panel_assets\index.html"
