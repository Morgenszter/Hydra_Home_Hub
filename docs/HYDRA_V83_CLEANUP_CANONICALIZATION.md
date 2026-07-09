# HYDRA v8.3 — Cleanup & Canonicalization Pass

## Cel
Po wielu iteracjach HYDRA ma dużo modułów, scaffoldów i ekranów testowych. Ten pass ustala jedną główną ścieżkę produkcyjną.

## Canonical entrypoints

### Backend
```txt
backend.api.asgi_v51:app
```

### Android
```txt
src/app/HydraAndroidBootstrap.tsx
```

### Desktop operator
```txt
desktop/operator_shell/hydra_operator_shell.py
```

### Voice
```txt
backend/voice/native_voice_integration_v79.py
backend/voice/voice_execution_runtime_v78.py
```

## Canonical backend APIs
- `/native-voice/*`
- `/voice-execution/*`
- `/voice-pipeline/*`
- `/operator/*`
- `/toolchain/*`
- `/live/*`
- `/runtime/*`

## Canonical Android path
```txt
HydraAndroidBootstrap
  → HydraAppRoot
    → HydraMainCockpitScreen
    → HydraOperatorScreen
```

## Legacy/demo candidates
Nie usuwać automatycznie bez ręcznego review:
- `backend/api/asgi_v50.py`
- `backend/api/main_v50.py`
- `src/screens/HydraHudRecoveryScreen.tsx`
- `HydraFrameShowcasePanel`

## Zasada po v8.3
Nie dodawać kolejnych równoległych scaffoldów. Każda nowa funkcja musi wejść w canonical path.
