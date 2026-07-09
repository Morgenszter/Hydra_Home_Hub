@echo off
setlocal
set HYDRA_HOME=%~dp0.hydra
if not exist "%HYDRA_HOME%" mkdir "%HYDRA_HOME%"
echo Starting HYDRA Bridge...
hydra_bridge.exe
pause
