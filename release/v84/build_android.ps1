$ErrorActionPreference = "Stop"
Write-Host "=== HYDRA v8.4 Android Build P6 ===" -ForegroundColor Cyan

npm install
npx tsc --noEmit --skipLibCheck

New-Item -ItemType Directory -Force -Path dist\android | Out-Null
Copy-Item -Force release\v84\ANDROID_RELEASE_CHECKLIST.md dist\android\ANDROID_RELEASE_CHECKLIST.md

Write-Host "TypeScript passed. Continue with project-specific React Native/Expo/Gradle APK or AAB build." -ForegroundColor Green

if (Test-Path "assets\loading") { Copy-Item -Recurse -Force assets\loading dist\android\loading-assets }

if (Test-Path "assets\gui-effects") { Copy-Item -Recurse -Force assets\gui-effects dist\android\gui-effects }

if (Test-Path "assets\v85-gui") { Copy-Item -Recurse -Force assets\v85-gui dist\android\v85-gui }
