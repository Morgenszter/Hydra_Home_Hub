# HYDRA v8.4 P4 — QA / Remaining Gaps

## Stronger after P4
- Android now has persisted WS/API settings.
- Android operator screen can call real backend action endpoint.
- Desktop panel has static UI asset with polling/actions.
- Panel fallback is usable even without pywebview.
- Final artifact structure documented.

## Still not final production
- OpenWakeWord and Vosk are dependency-safe boundaries; real models must be installed and configured.
- Native tray lifecycle remains partially fallback until pystray icon/menu packaging is completed.
- Android APK/AAB build still depends on the actual React Native project environment.
- Windows binary packaging still needs PyInstaller/Nuitka finalization.
