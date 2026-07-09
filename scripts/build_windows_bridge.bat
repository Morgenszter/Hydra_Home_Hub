@echo off
setlocal
cd /d %~dp0\..
python -m compileall backend
echo HYDRA Win bridge source smoke build complete.
