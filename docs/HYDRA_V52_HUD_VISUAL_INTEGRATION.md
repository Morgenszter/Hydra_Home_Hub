# HYDRA v5.2 — HUD Visual Integration Layer

## Cel

Wpięcie paczki `HYDRA_Alpha_Legion_25D_UI_Frames.zip` jako oficjalnej warstwy wizualnej HUD 2.5D.

## Dodane assety

```json
[
  "src/assets/hud/alpha_legion/HYDRA_Frame_01_wide_top_bottom_serpents.png",
  "src/assets/hud/alpha_legion/HYDRA_Frame_02_vertical_serpent_columns.png",
  "src/assets/hud/alpha_legion/HYDRA_Frame_03_square_serpent_ui.png",
  "src/assets/hud/alpha_legion/HYDRA_Frame_04_wide_compact_ui.png",
  "src/assets/hud/alpha_legion/HYDRA_Alpha_Legion_icon_01_512.png",
  "src/assets/hud/alpha_legion/manifest.json",
  "src/assets/hud/alpha_legion/README.txt"
]
```

## Dodane pliki

- `src/assets/hud/alpha_legion/hydraAlphaLegionFrames.ts`
- `src/components/hud/HydraHudFrame.tsx`
- `src/components/hud/HydraAlphaLegionBadge.tsx`
- `src/components/hud/HydraAlphaLegionHudPanel.tsx`
- `src/components/hud/HydraFrameShowcasePanel.tsx`

## Warianty ramek

- `wide_top_bottom_serpents`
- `vertical_serpent_columns`
- `square_serpent_ui`
- `wide_compact_ui`

## Zasada integracji

Frame nie zastępuje logiki HUD.
Frame jest wrapperem wizualnym:

```tsx
<HydraHudFrame variant="square_serpent_ui" palette={palette} intensity={visualFx.borderGlow}>
  <Radar />
</HydraHudFrame>
```

## Mapowanie

- Wide top/bottom serpents → dashboard / command center
- Vertical serpent columns → boczna telemetria / log
- Square serpent UI → voice core / radar / focus card
- Wide compact UI → mobile action strip / quick controls

## Ikona

`HYDRA_Alpha_Legion_icon_01_512.png` została dodana do assetów i może być używana jako ikona Android/Win tray.
