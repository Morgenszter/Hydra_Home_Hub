# HYDRA v8.4 P7 — Loader/UI Integration

## Source
- `Hydra_Home_Loader_Integration_v2.zip`

## Integrated
- Android loader component/screen/theme
- Android bootstrap boot screen
- Desktop operator loading overlay
- Loading assets copied into:
  - `src/assets/loading`
  - `desktop/operator_shell/panel_assets/loading`
  - `assets/loading`
- Release scripts copy loading assets

## Detection
- copiedAssets: True
- HydraAnimatedLoader source copied: True
- LoadingScreen source copied: True
- hydraTheme source copied: True

## Notes
WPF/WinUI3 files from the loader package are treated as visual reference because HYDRA desktop canonical stack remains `pystray + pywebview + Python backend`.
