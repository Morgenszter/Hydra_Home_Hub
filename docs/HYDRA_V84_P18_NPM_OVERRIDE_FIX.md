# HYDRA v8.4 P18 — NPM Override Fix

## Fixed
Real Win11 install error:

```txt
npm error code EOVERRIDE
Override for @types/node@^16.18.126 conflicts with direct dependency
```

## Cause
`package.json` had an `overrides` block pinning `@types/node`, while `@types/node` was also a direct dev dependency. Newer npm rejects this combination when specs do not match exactly.

## Fix
- Removed `package.json.overrides`.
- Set direct `devDependencies["@types/node"]` to exact `16.18.126`.
- Added `install_android_deps_p18.ps1`.
- Added fallback `npm install --force` if peer resolver still fails.
- `build_android.ps1` now routes option `1`/`2` to P18 scripts.

## Run
```powershell
cd C:\Users\cezar\Desktop\HYDRA_INTELLIGENCE_V84_MASTER_P1_P18_NPM_OVERRIDE_FIX_PACK
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\install_android_deps_p18.ps1
.\scripts\start_android_p18.ps1
```
