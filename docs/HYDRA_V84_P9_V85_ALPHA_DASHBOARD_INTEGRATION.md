# HYDRA v8.4 P9 — V85 Alpha Dashboard Integration

## Source
- `HYDRA_INTELLIGENCE_V85_GUI_VISUAL_UPGRADE_MERGED.zip`

## Strategy
V85 is integrated as an additional Android mode, not as a replacement for canonical root.

Canonical root remains:

```txt
src/app/HydraAndroidBootstrap.tsx
```

## Integrated
- `src/screens/HydraV85AlphaDashboardScreen.tsx`
- `src/screens/HydraV85AlphaDashboardShell.tsx`
- V85 support code copied under `src/v85/*` where available
- V85 assets copied under:
  - `assets/v85-gui`
  - `src/assets/v85-gui`
  - `desktop/operator_shell/panel_assets/v85-gui`
- Android bootstrap mode added:
  - `cockpit`
  - `operator`
  - `alpha`
- Desktop operator panel gets V85 visual status card
- Release scripts copy V85 GUI assets

## V85 package stats
```json
{
  "file_count": 802,
  "ext_counts": {
    ".json": 57,
    ".tsx": 104,
    ".js": 1,
    ".txt": 6,
    ".bak": 2,
    "<none>": 17,
    ".py": 82,
    ".md": 92,
    ".docx": 1,
    ".png": 85,
    ".bat": 2,
    ".yml": 1,
    ".mp3": 3,
    ".ts": 263,
    ".bak_v34": 1,
    ".pyc": 75,
    ".html": 1,
    ".ps1": 6,
    ".spec": 2,
    ".sh": 1
  }
}
```

## Integration copied map
```json
{
  "HydraV85AlphaDashboardScreen": true,
  "v85_components": true,
  "v85_effects": true,
  "v85_hooks": true,
  "v85_theme": true,
  "v85_context": true,
  "v85_services": true,
  "v85_assets_release": true,
  "v85_assets_android": true,
  "v85_assets_desktop": true
}
```

## Asset count
```txt
32
```

## Notes
The V85 `App.tsx` is not used as root because it would conflict with canonical bootstrap. Its dashboard value is integrated through the Alpha mode.
