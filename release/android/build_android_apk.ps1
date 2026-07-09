$ErrorActionPreference = "Stop"

Write-Host "=== HYDRA Android APK Release Build ===" -ForegroundColor Cyan

$Root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
Set-Location $Root

if (!(Test-Path "package.json")) {
  throw "package.json not found. Run this from HYDRA project root."
}

npm install

Write-Host "Running TypeScript check..." -ForegroundColor Yellow
npx tsc --noEmit --skipLibCheck

Write-Host "Building Android APK..." -ForegroundColor Yellow
npx expo prebuild --platform android --clean
cd android
.\gradlew.bat assembleRelease
cd ..

Write-Host "DONE: android\app\build\outputs\apk\release\app-release.apk" -ForegroundColor Green
