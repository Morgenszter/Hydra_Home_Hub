# HYDRA v8.4 P8 — GUI Effects Integration

## Source
- `Hydra_Home_GUI_Effects_v5_TransparentBackground.zip`

## Integrated into Android
- `src/assets/loading-transparent`
- `src/assets/alpha-frames`
- `src/assets/alpha-icons`
- namespaced reference components under `src/gui-effects-v5`
- stable HYDRA wrapper:
  - `src/effects/HydraGuiEffectsTheme.ts`
  - `src/components/HydraGlassPanel.tsx`

## Integrated into desktop panel
- `desktop/operator_shell/panel_assets/loading-transparent`
- `desktop/operator_shell/panel_assets/alpha-frames`
- `desktop/operator_shell/panel_assets/alpha-icons`
- alpha frame glow overlay in `index.html`

## Integrated into release assets
- `assets/gui-effects/loading-transparent`
- `assets/gui-effects/alpha-frames`
- `assets/gui-effects/alpha-icons`

## Asset counts
```json
{
  "loadingTransparent": 6,
  "alphaFrames": 4,
  "alphaIcons": 9
}
```

## Decision
WPF/WinUI3 resources remain visual reference only. Canonical desktop stack remains `pystray + pywebview + Python backend`.
