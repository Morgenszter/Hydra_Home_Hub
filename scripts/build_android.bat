@echo off
echo === HYDRA Android P12 build pass ===
if exist package.json call npm install
if exist tsconfig.json call npx tsc --noEmit --skipLibCheck
if not exist dist\android mkdir dist\android
copy /Y release\v84\ANDROID_RELEASE_PASS_P12.md dist\android\ANDROID_RELEASE_PASS_P12.md >nul
copy /Y release\v84\ANDROID_E2E_CHECKLIST_P12.md dist\android\ANDROID_E2E_CHECKLIST_P12.md >nul
echo Android release pass prepared.
