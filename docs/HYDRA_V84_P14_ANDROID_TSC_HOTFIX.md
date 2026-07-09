# HYDRA v8.4 P14 — Android TypeScript Hotfix

## Naprawione
- TypeScript nie kompiluje już archiwalnych/reference folderów `src/v85`, `src/gui-effects-v5`, `src/components/hud`.
- `App.tsx` wskazuje bezpośrednio na canonical `HydraAndroidBootstrap`.
- `HydraAndroidBootstrap.tsx` przepisany na stabilny root.
- `HydraV85AlphaDashboardScreen.tsx` przepisany na bezpieczny ekran `alpha`.
- `hydraAndroidSettings.ts` używa `HYDRA_ANDROID_CONFIG`.
- Dodane shimy assetów i AsyncStorage.

## Uruchom teraz na Windows

```powershell
npm install
npx tsc --noEmit --skipLibCheck
npx expo start --clear
```
