import { HydraAnimationCommand } from "./hydraAnimationTypes";
import { HydraThemeMode } from "../theme/hydraThemes";

export type HydraVisualFXState = {
  borderGlow: number;
  radarSweep: number;
  consoleFlash: number;
  alertOverlay: number;
  pulseLevel: number;
  scanlineLevel: number;
  themeMode: HydraThemeMode;
  message?: string;
};

export class HydraVisualFXBridge {
  private state: HydraVisualFXState = {
    borderGlow: 0,
    radarSweep: 0,
    consoleFlash: 0,
    alertOverlay: 0,
    pulseLevel: 0,
    scanlineLevel: 0,
    themeMode: "green",
  };

  private listeners: Array<(state: HydraVisualFXState) => void> = [];

  onChange(listener: (state: HydraVisualFXState) => void) {
    this.listeners.push(listener);
    listener(this.snapshot());
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  snapshot(): HydraVisualFXState {
    return { ...this.state };
  }

  setThemeMode(mode: HydraThemeMode) {
    this.state = { ...this.state, themeMode: mode };
    this.emit();
  }

  applyAnimation(command: HydraAnimationCommand | null) {
    if (!command) {
      this.state = {
        ...this.state,
        borderGlow: 0,
        radarSweep: 0,
        consoleFlash: 0,
        alertOverlay: 0,
        pulseLevel: 0,
        scanlineLevel: 0,
        message: undefined,
      };
      this.emit();
      return;
    }

    const intensity = command.intensity;
    const next: HydraVisualFXState = {
      ...this.state,
      borderGlow: 0,
      radarSweep: 0,
      consoleFlash: 0,
      alertOverlay: 0,
      pulseLevel: 0,
      scanlineLevel: 0,
      message: command.message,
    };

    switch (command.kind) {
      case "pulse":
        next.pulseLevel = intensity;
        next.borderGlow = intensity * 0.9;
        next.consoleFlash = intensity * 0.6;
        break;
      case "scanline":
        next.scanlineLevel = intensity;
        next.consoleFlash = intensity * 0.5;
        break;
      case "radar_sweep":
        next.radarSweep = intensity;
        next.borderGlow = intensity * 0.45;
        break;
      case "red_alert":
        next.alertOverlay = intensity;
        next.borderGlow = intensity;
        next.consoleFlash = intensity * 0.7;
        break;
      case "glow":
        next.borderGlow = intensity;
        next.pulseLevel = intensity * 0.55;
        break;
      case "fade":
        next.consoleFlash = intensity * 0.3;
        break;
      case "boot":
      case "shutdown":
      default:
        next.borderGlow = intensity * 0.4;
        break;
    }

    this.state = next;
    this.emit();
  }

  private emit() {
    const snapshot = this.snapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}
