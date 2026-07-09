# HYDRA v3.7 — Theme Engine + Visual FX Bridge

## Dodane

### Theme Engine
- `src/theme/hydraThemes.ts`
- `src/theme/HydraThemeEngine.ts`
- `src/hooks/useHydraThemeEngine.ts`

### Visual FX
- `src/animation/HydraVisualFXBridge.ts`
- `src/hooks/useHydraVisualFX.ts`
- `src/components/hud/HydraVisualOverlay.tsx`

### HUD
- `src/components/hud/HydraThemeControlPanel.tsx`
- aktualizacja `HydraProtocolHudPanel.tsx`

## Tryby motywu

- `green`
- `blue`
- `red_alert`
- `night_ops`

## Automatyczne mapowanie eventów

- `error` → `red_alert`
- `scene_start` → `blue`
- `warning` → `night_ops`
- `success` / `scene_done` → `green`

## Visual FX bridge

`HydraVisualFXBridge` tłumaczy aktualną animację na stan HUD:

- `borderGlow`
- `radarSweep`
- `consoleFlash`
- `alertOverlay`
- `pulseLevel`
- `scanlineLevel`

## Cel tej iteracji

To nie jest jeszcze finalny renderer wszystkich animacji.
To jest **warstwa sterująca**, która pozwala Twojemu HUD / Design Systemowi reagować na:
- theme mode,
- aktualną animację,
- poziomy efektów wizualnych.
