# HYDRA v7.2 — Android Recovery Test Plan

## Manual

1. Uruchom HUD screen z `HydraHudRecoveryScreen`.
2. Zasymuluj pusty cache:
   - oczekuj `DISCONNECTED` / `CONNECTING`
3. Podaj snapshot przez bridge:
   - oczekuj `REPLAYING` -> `READY`
4. Zerwij WS:
   - oczekuj `DEGRADED` albo `DISCONNECTED`
5. Uruchom ponownie:
   - oczekuj odczytu ostatniego cache

## Frontend files

- `src/mobile/recovery/hydraRecoveryController.ts`
- `src/hooks/useHydraRuntimeBridge.ts`
- `src/components/hud/HydraRecoveryBanner.tsx`
- `src/screens/HydraHudRecoveryScreen.tsx`
