# HYDRA v8.3 — Final Sprint Plan

## Sprint A — Real voice
1. Install native mic capture provider.
2. Feed PCM16 chunks into `HydraNativeVoiceIntegrationV79`.
3. Attach OpenWakeWord/Porcupine.
4. Attach Vosk PL streaming recognizer.
5. Feed transcript into `/native-voice/transcript`.

## Sprint B — Android root
1. Make `HydraAndroidBootstrap` the real app entrypoint.
2. Add bridge host configuration UI.
3. Persist host/pairing/recovery state.
4. Wire app lifecycle reconnect.

## Sprint C — Desktop operator
1. Wrap `desktop/operator_shell` in tray UI.
2. Add menu actions.
3. Add logs viewer.
4. Add emergency confirmation UI.

## Sprint D — Packaging
1. Build Win11 bridge package.
2. Build Android APK/AAB.
3. Include HUD assets, icon, voice assets, config templates.
4. Run release checklist.
