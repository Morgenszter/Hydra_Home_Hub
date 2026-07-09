# HYDRA v3.2 — analiza i kompilacja

## Wejście

- `HYDRA_INTELLIGENCE (3).zip` — pełny projekt Expo/React Native z zależnościami.
- `Pliki HYDRA.zip` — niezależny moduł HYDRA.
- `HYDRA_PLAN_PROJEKTU.docx` — plan modułu HYDRA.

## Decyzja architektoniczna

Moduł z `Pliki HYDRA.zip` został dodany jako izolowana warstwa:

```txt
src/hydraModule/
```

Nie został rozlany bezpośrednio po istniejącym `src/`, żeby nie nadpisać aktualnych ekranów, kontekstu, HUD ani plików mostu.

## Dodane

- `src/hydraModule/*`
- `src/hydraModule/index.ts`
- `src/services/hydraModuleBridgeFacade.ts`
- `docs/HYDRA_MODULE_README.md`
- `docs/HYDRA_PLAN_PROJEKTU.docx`
- `docs/HYDRA_V32_ANALIZA_I_KOMPILACJA.md`

## Połączenie ze stabilnym Bridge

Nowy `HydraModuleBridgeFacade` mapuje komendy modułu na istniejący `HydraBridgeClient`.

Dzięki temu:

```txt
HYDRA Module / UX / Kernel
        ↓
HydraModuleBridgeFacade
        ↓
HydraBridgeClient
        ↓
HYDRA Bridge API v2.8
        ↓
Lotus BLE / Tapo L630 / Heater Wi-Fi
```

## Status kompilacji

Python backend:
- sprawdzony przez `py_compile`

TypeScript:
- paczka zawiera moduły TS/TSX gotowe do dalszego spięcia.
- jeśli lokalne `tsc` wykryje błędy w module źródłowym, są one zachowane jako problem integracyjny w raporcie, nie usuwane przez nadpisanie architektury.

## Następny etap

1. Ujednolicić typy z `src/hydraModule/HydraTypes.ts` z `src/types/hydraProtocol.ts`.
2. Podpiąć `HydraKernel` do `HydraBridgeProvider`.
3. Podłączyć `AudioQueue` do eventów `COMMAND_ACK / COMMAND_COMPLETED / COMMAND_FAILED`.
4. Podłączyć `RadarEngine` i `TelemetryService` do HUD.
