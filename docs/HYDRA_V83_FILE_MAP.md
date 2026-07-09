# HYDRA v8.3 — File Map

## Core backend
- `backend/api/asgi_v51.py` — canonical ASGI API
- `backend/core/hydra_runtime_state_v67.py` — unified runtime state
- `backend/core/hydra_live_integration_v69.py` — live event integration
- `backend/core/hydra_command_router_v62.py` — command router

## Voice
- `backend/voice/native_voice_integration_v79.py` — canonical external voice bridge
- `backend/voice/voice_execution_runtime_v78.py` — execution runtime
- `backend/voice/real_voice_pipeline_v75.py` — wake window + intent path
- `backend/voice/voice_intent_parser_v75.py` — local parser

## Operator
- `backend/api/operator_v73.py` — operator backend API
- `backend/desktop/operator_desktop_v73.py` — action layer
- `desktop/operator_shell/hydra_operator_shell.py` — CLI shell

## Android
- `src/app/HydraAndroidBootstrap.tsx` — canonical app bootstrap
- `src/app/HydraAppRoot.tsx` — root mode switch
- `src/screens/HydraMainCockpitScreen.tsx` — cockpit
- `src/screens/HydraOperatorScreen.tsx` — operator companion
- `src/hooks/useHydraRuntimeBridge.ts` — runtime bridge
- `src/mobile/offline/*` — offline cache
- `src/mobile/recovery/*` — recovery controller

## Toolchain
- `backend/api/toolchain_v71.py`
- `src/toolchain/*`
- `.github/workflows/hydra-ci.yml`
