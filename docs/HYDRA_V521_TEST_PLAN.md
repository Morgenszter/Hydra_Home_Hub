# HYDRA v5.2.1 — test plan

## 1. Compact mode
Zmniejsz szerokość okna / uruchom na małym Androidzie.

Oczekiwane:
- dashboardVariant = `wide_compact_ui`
- commandVariant = `wide_compact_ui`

## 2. Voice mode
Ustaw session.mode = `voice` albo commandState.status = `listening`.

Oczekiwane:
- focusVariant = `square_serpent_ui`
- focusIntensity rośnie

## 3. Red alert
Aktywuj alertState.active = true lub level = critical.

Oczekiwane:
- dashboardVariant = `wide_top_bottom_serpents`
- focusVariant = `square_serpent_ui`
- dashboardIntensity rośnie

## 4. Device focus
Podaj focusedDeviceId.

Oczekiwane:
- telemetryVariant = `vertical_serpent_columns`

## 5. Landscape
Uruchom szeroki viewport.

Oczekiwane:
- reason zawiera `landscape`
