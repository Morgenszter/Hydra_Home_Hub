import { HydraHudSignal } from "../services/hydraHudEventBridge";
import { HydraThemeMode, hydraThemes } from "./hydraThemes";

export type HydraThemeEngineState = {
  mode: HydraThemeMode;
  locked: boolean;
  lastReason?: string;
};

export class HydraThemeEngine {
  private state: HydraThemeEngineState = {
    mode: "green",
    locked: false,
  };

  private listeners: Array<(state: HydraThemeEngineState) => void> = [];

  onChange(listener: (state: HydraThemeEngineState) => void) {
    this.listeners.push(listener);
    listener(this.snapshot());
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  snapshot() {
    return { ...this.state };
  }

  setMode(mode: HydraThemeMode, reason = "manual") {
    this.state = {
      mode,
      locked: this.state.locked,
      lastReason: reason,
    };
    this.emit();
  }

  setLocked(locked: boolean) {
    this.state = { ...this.state, locked };
    this.emit();
  }

  resolveFromSignal(signal: HydraHudSignal) {
    if (this.state.locked) {
      return this.state.mode;
    }

    if (signal.type === "error") {
      this.setMode("red_alert", "error_signal");
      return "red_alert";
    }

    if (signal.type === "scene_start") {
      this.setMode("blue", "scene_start");
      return "blue";
    }

    if (signal.type === "warning") {
      this.setMode("night_ops", "warning_signal");
      return "night_ops";
    }

    if (signal.type === "success" || signal.type === "scene_done") {
      this.setMode("green", "success_signal");
      return "green";
    }

    return this.state.mode;
  }

  getPalette() {
    return hydraThemes[this.state.mode];
  }

  private emit() {
    const snapshot = this.snapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}
