# HYDRA v5.2 — test plan HUD Visual Integration

## 1. Asset check

Sprawdź czy istnieją:
- `src/assets/hud/alpha_legion/HYDRA_Frame_01_wide_top_bottom_serpents.png`
- `src/assets/hud/alpha_legion/HYDRA_Frame_02_vertical_serpent_columns.png`
- `src/assets/hud/alpha_legion/HYDRA_Frame_03_square_serpent_ui.png`
- `src/assets/hud/alpha_legion/HYDRA_Frame_04_wide_compact_ui.png`
- `src/assets/hud/alpha_legion/HYDRA_Alpha_Legion_icon_01_512.png`

## 2. Render check

Uruchom Android HUD.

Oczekiwane:
- panel `ALPHA LEGION HUD FRAMES`
- 4 warianty ramek
- brak crasha `require(...)`

## 3. Protocol HUD

Otwórz `HydraProtocolHudPanel`.

Oczekiwane:
- nowy panel `HYDRA / ALPHA LEGION`
- session mode widoczny
- alert/scene/command/fx metryki widoczne

## 4. Theme response

Przełącz:
- green
- blue
- red_alert
- night_ops

Oczekiwane:
- ramy zachowują transparentną teksturę
- glow i overlay zmieniają się z paletą

## 5. Mobile layout

Sprawdź mały ekran Android.

Oczekiwane:
- content nie wychodzi poza ramkę
- paddingi zachowują czytelność
