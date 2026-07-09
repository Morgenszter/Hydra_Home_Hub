# HYDRA v8.4 P15 — Android Boot Export Fix

## Fixed
Runtime error:

```txt
React.jsx: type is invalid ... got undefined.
Check your code at HydraAndroidBootstrap.tsx:52.
```

## Cause
`LoadingScreen` was imported/rendered from `HydraAndroidBootstrap`, but the component export/import contract could be mismatched after loader asset integrations.

## Fix
- `src/screens/LoadingScreen.tsx` now exports both:
  - named `LoadingScreen`
  - default `LoadingScreen`
- `src/components/HydraAnimatedLoader.tsx` now exports both:
  - named `HydraAnimatedLoader`
  - default `HydraAnimatedLoader`
- `HydraAndroidBootstrap.tsx` imports `LoadingScreen` as default.

## Run
```powershell
npm install
npx tsc --noEmit --skipLibCheck
npx expo start --clear
```
