$ErrorActionPreference = "Stop"

Write-Host "=== HYDRA P18 Android install: clean ===" -ForegroundColor Cyan
npm run hydra:android:clean

Write-Host "=== HYDRA P18 Android install: npm install --legacy-peer-deps ===" -ForegroundColor Cyan
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
  Write-Host "npm install failed, retrying with --force" -ForegroundColor Yellow
  npm install --force
}

Write-Host "=== HYDRA P18 Android install: explicit Metro/Babel deps ===" -ForegroundColor Cyan
npm install --save-dev --legacy-peer-deps @babel/core@^7.20.0 @babel/parser@^7.20.0 @babel/runtime@^7.20.0 babel-preset-expo@~9.2.0 metro@0.70.3 metro-config@0.70.3 @types/node@16.18.126 typescript@~4.9.5
if ($LASTEXITCODE -ne 0) {
  Write-Host "explicit dev dependency install failed, retrying with --force" -ForegroundColor Yellow
  npm install --save-dev --force @babel/core@^7.20.0 @babel/parser@^7.20.0 @babel/runtime@^7.20.0 babel-preset-expo@~9.2.0 metro@0.70.3 metro-config@0.70.3 @types/node@16.18.126 typescript@~4.9.5
}

npm run hydra:android:doctor
npx tsc --noEmit --skipLibCheck
