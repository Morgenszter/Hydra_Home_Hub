import { HydraHudSignal } from "../services/hydraHudEventBridge";
import { HydraAnimationCommand, mapHudSignalToAnimation } from "./hydraAnimationTypes";

export type HydraAnimationEngineState = {
  current: HydraAnimationCommand | null;
  queue: HydraAnimationCommand[];
  history: HydraAnimationCommand[];
};

export class HydraAnimationEngine {
  private current: HydraAnimationCommand | null = null;
  private queue: HydraAnimationCommand[] = [];
  private history: HydraAnimationCommand[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;
  private listeners: Array<(state: HydraAnimationEngineState) => void> = [];

  enqueueFromSignal(signal: HydraHudSignal) {
    this.enqueue(mapHudSignalToAnimation(signal));
  }

  enqueue(command: HydraAnimationCommand) {
    this.queue.push(command);
    this.emit();
    this.pump();
  }

  onChange(listener: (state: HydraAnimationEngineState) => void) {
    this.listeners.push(listener);
    listener(this.snapshot());
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  completeCurrent() {
    if (this.current) {
      this.history = [...this.history.slice(-99), this.current];
    }
    this.current = null;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.emit();
    this.pump();
  }

  clear() {
    this.current = null;
    this.queue = [];
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.emit();
  }

  snapshot(): HydraAnimationEngineState {
    return {
      current: this.current,
      queue: [...this.queue],
      history: [...this.history],
    };
  }

  private pump() {
    if (this.current || this.queue.length === 0) {
      return;
    }

    this.current = this.queue.shift() ?? null;
    this.emit();

    if (this.current) {
      this.timer = setTimeout(() => this.completeCurrent(), this.current.durationMs);
    }
  }

  private emit() {
    const state = this.snapshot();
    for (const listener of this.listeners) {
      listener(state);
    }
  }
}
