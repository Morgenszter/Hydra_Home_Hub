# HYDRA v8.4 P12 — Final Android Release Pass

## Canonical Android root
`src/app/HydraAndroidBootstrap.tsx`

## Modes
- cockpit
- operator
- alpha

## Canonical endpoints
- API: `http://<host>:8765`
- WS: `ws://<host>:8765/ws/runtime`

## Final Android release flow
1. Confirm `app.json`, `eas.json`, `src/config/hydraAndroidConfig.ts`
2. Confirm icons/splash in `assets/android/`
3. Run `scripts/build_android.ps1` or `scripts/build_android.bat`
4. Build EAS preview
5. Build EAS production
6. Install APK on LAN device
7. Verify bridge host and WS in-app settings
8. Run Android E2E checklist
