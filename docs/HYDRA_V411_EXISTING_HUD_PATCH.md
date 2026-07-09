# HYDRA v4.1.1 — Existing HUD Patch Analysis + Safe Wrappers

## Cel

Przeanalizować realne pliki HUD i przygotować bezpieczny patch bez ryzyka złamania istniejących komponentów.

## Wykryte pliki

```json
[
  {
    "file": "src/hooks/useHydraRadarFx.ts",
    "exports": [
      "useHydraRadarFx"
    ],
    "default_export": false,
    "lines": 14,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hooks/useHydraConsoleFx.ts",
    "exports": [
      "useHydraConsoleFx"
    ],
    "default_export": false,
    "lines": 14,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hooks/useHydraDeviceTileFx.ts",
    "exports": [
      "useHydraDeviceTileFx"
    ],
    "default_export": false,
    "lines": 16,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hydraModule/radar/RadarEngine.ts",
    "exports": [],
    "default_export": false,
    "lines": 4,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hydraModule/radar/RadarRenderer.ts",
    "exports": [],
    "default_export": false,
    "lines": 4,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hydraModule/components/hud/ConsoleLog.tsx",
    "exports": [
      "ConsoleLog"
    ],
    "default_export": true,
    "lines": 2,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hydraModule/components/hud/DeviceStatus.tsx",
    "exports": [
      "DeviceStatus"
    ],
    "default_export": true,
    "lines": 2,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hydraModule/components/hud/Radar.tsx",
    "exports": [],
    "default_export": true,
    "lines": 2,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/hydraModule/components/hud/StatusPanel.tsx",
    "exports": [],
    "default_export": true,
    "lines": 2,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/components/hud/ConsoleLog.tsx",
    "exports": [
      "ConsoleLog"
    ],
    "default_export": true,
    "lines": 86,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/DeviceStatus.tsx",
    "exports": [
      "DeviceStatus"
    ],
    "default_export": true,
    "lines": 72,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/Radar.tsx",
    "exports": [
      "Radar"
    ],
    "default_export": true,
    "lines": 45,
    "has_style": true,
    "has_props": false
  },
  {
    "file": "src/components/hud/StatusPanel.tsx",
    "exports": [
      "StatusPanel"
    ],
    "default_export": true,
    "lines": 15,
    "has_style": false,
    "has_props": false
  },
  {
    "file": "src/components/hud/HydraProtocolConsole.tsx",
    "exports": [
      "HydraProtocolConsole"
    ],
    "default_export": false,
    "lines": 107,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/HydraAnimationStatusPanel.tsx",
    "exports": [
      "HydraAnimationStatusPanel"
    ],
    "default_export": false,
    "lines": 110,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/BoundHydraStatusPanel.tsx",
    "exports": [
      "BoundHydraStatusPanel"
    ],
    "default_export": false,
    "lines": 55,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/BoundHydraRadar.tsx",
    "exports": [
      "BoundHydraRadar"
    ],
    "default_export": false,
    "lines": 75,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/BoundHydraConsole.tsx",
    "exports": [
      "BoundHydraConsole"
    ],
    "default_export": false,
    "lines": 60,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/BoundHydraDeviceTile.tsx",
    "exports": [
      "BoundHydraDeviceTile"
    ],
    "default_export": false,
    "lines": 59,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/HydraPatchedRadar.tsx",
    "exports": [
      "HydraPatchedRadar"
    ],
    "default_export": false,
    "lines": 40,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/HydraPatchedConsoleLog.tsx",
    "exports": [
      "HydraPatchedConsoleLog"
    ],
    "default_export": false,
    "lines": 39,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/components/hud/HydraPatchedDeviceStatus.tsx",
    "exports": [
      "HydraPatchedDeviceStatus"
    ],
    "default_export": false,
    "lines": 37,
    "has_style": true,
    "has_props": true
  },
  {
    "file": "src/common/components/Radar.tsx",
    "exports": [],
    "default_export": false,
    "lines": 1,
    "has_style": false,
    "has_props": false
  }
]
```

## Wygenerowane wrappery

```json
[
  {
    "source": "src/hydraModule/components/hud/ConsoleLog.tsx",
    "wrapper": "src/hydraModule/components/hud/ConsoleLogFx.tsx"
  },
  {
    "source": "src/hydraModule/components/hud/DeviceStatus.tsx",
    "wrapper": "src/hydraModule/components/hud/DeviceStatusFx.tsx"
  },
  {
    "source": "src/hydraModule/components/hud/Radar.tsx",
    "wrapper": "src/hydraModule/components/hud/RadarFx.tsx"
  },
  {
    "source": "src/hydraModule/components/hud/StatusPanel.tsx",
    "wrapper": "src/hydraModule/components/hud/StatusPanelFx.tsx"
  },
  {
    "source": "src/components/hud/ConsoleLog.tsx",
    "wrapper": "src/components/hud/ConsoleLogFx.tsx"
  },
  {
    "source": "src/components/hud/DeviceStatus.tsx",
    "wrapper": "src/components/hud/DeviceStatusFx.tsx"
  },
  {
    "source": "src/components/hud/Radar.tsx",
    "wrapper": "src/components/hud/RadarFx.tsx"
  },
  {
    "source": "src/components/hud/HydraProtocolConsole.tsx",
    "wrapper": "src/components/hud/HydraProtocolConsoleFx.tsx"
  },
  {
    "source": "src/components/hud/HydraAnimationStatusPanel.tsx",
    "wrapper": "src/components/hud/HydraAnimationStatusPanelFx.tsx"
  }
]
```

## Pominięte pliki

```json
[
  {
    "file": "src/hooks/useHydraRadarFx.ts",
    "reason": "not_visual_component"
  },
  {
    "file": "src/hooks/useHydraConsoleFx.ts",
    "reason": "not_visual_component"
  },
  {
    "file": "src/hooks/useHydraDeviceTileFx.ts",
    "reason": "not_visual_component"
  },
  {
    "file": "src/hydraModule/radar/RadarEngine.ts",
    "reason": "not_visual_component"
  },
  {
    "file": "src/hydraModule/radar/RadarRenderer.ts",
    "reason": "not_visual_component"
  },
  {
    "file": "src/components/hud/StatusPanel.tsx",
    "reason": "not_visual_component"
  },
  {
    "file": "src/components/hud/BoundHydraStatusPanel.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/components/hud/BoundHydraRadar.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/components/hud/BoundHydraConsole.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/components/hud/BoundHydraDeviceTile.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/components/hud/HydraPatchedRadar.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/components/hud/HydraPatchedConsoleLog.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/components/hud/HydraPatchedDeviceStatus.tsx",
    "reason": "generated_component"
  },
  {
    "file": "src/common/components/Radar.tsx",
    "reason": "not_visual_component"
  }
]
```

## Decyzja

Zamiast agresywnie przepisywać istniejące komponenty, v4.1.1 dodaje:
- `HydraExistingHudFxAdapters`
- `HydraExistingHudPatchReportPanel`
- bezpieczne sibling wrappery `*Fx.tsx` dla wykrytych komponentów, jeśli ich eksport dało się rozpoznać

## Dlaczego

To zachowuje zgodność:
- istniejące importy dalej działają,
- nowe komponenty mogą używać FX,
- można krok po kroku zastępować oryginalne importy wersjami `*Fx`.

## Następny etap

v4.2 powinien zrobić konkretny patch jednego komponentu naraz:
1. Radar
2. Console
3. DeviceTile/DeviceStatus
