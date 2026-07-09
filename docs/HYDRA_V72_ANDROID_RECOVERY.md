# HYDRA v7.2 — Android HUD Recovery Integration

## Dodane

### Recovery runtime
- `src/mobile/recovery/hydraRecoveryController.ts`
- `src/hooks/useHydraRuntimeBridge.ts`

### HUD UI
- `src/components/hud/HydraRecoveryBanner.tsx`
- `src/screens/HydraHudRecoveryScreen.tsx`

## Co daje

- bootstrap HUD z cache offline
- connection stage banner
- replay flow po odebraniu runtime snapshot
- degradacja / disconnect zapisane do offline state
- gotowy hook do podpięcia pod główny ekran HUD

## Oczekiwany flow

1. Android startuje z ostatniego cache
2. pokazuje banner recovery
3. łączy się do bridge WS
4. po `HYDRA_RUNTIME_SNAPSHOT` robi replay
5. przechodzi do `READY`
