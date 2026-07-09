# HYDRA Patch Apply Order

Apply these patch bundles on top of the latest full HYDRA source package:

```txt
1. HYDRA_INTELLIGENCE_V52_HUD_VISUAL_INTEGRATION_PATCH.zip
2. HYDRA_INTELLIGENCE_V521_FRAME_BINDING_ENGINE_PATCH.zip
3. HYDRA_INTELLIGENCE_V56_RELEASE_CANDIDATE_PATCH.zip
4. HYDRA_INTELLIGENCE_V57_FINAL_RELEASE_HARDENING_PATCH.zip
```

For a clean release build:
1. Extract the full base project.
2. Overlay each patch in order.
3. Run backend compile.
4. Run Android TypeScript check.
5. Build Win11 onedir.
6. Build Android APK.
