# HYDRA v8.4 P17 — Android Metro/Babel Fix

## Fixed from real logs
- `Found 50 errors ... node_modules/@types/node/ffi.d.ts`
- `Cannot find module '@babel/parser'`
- Metro/Expo resolver crash caused by incomplete/mismatched dependency tree.

## Changes
- Pins `@types/node` to `16.18.126`.
- Adds explicit Babel/Metro dev dependencies:
  - `@babel/core`
  - `@babel/parser`
  - `@babel/runtime`
  - `babel-preset-expo`
  - `metro@0.70.3`
  - `metro-config@0.70.3`
- Adds `babel.config.js`.
- Adds `metro.config.js`.
- Adds `hydra_android_doctor.js`.
- Adds P17 install/start helpers.

## Run on Windows

```powershell
cd C:\Users\cezar\Desktop\HYDRA_INTELLIGENCE_V84_MASTER_P1_P17_ANDROID_METRO_BABEL_FIX_PACK
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\install_android_deps_p17.ps1
.\scripts\start_android_p17.ps1
```
