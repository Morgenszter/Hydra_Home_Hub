import { HydraEvent } from "../types/hydraProtocol";
import { HydraEventRouter, HydraRoutedEvent } from "./hydraEventRouter";

export type HydraHudSignalType =
  | "log"
  | "success"
  | "warning"
  | "error"
  | "scene_start"
  | "scene_done"
  | "device_update"
  | "pulse";

export type HydraHudSignal = {
  id: string;
  type: HydraHudSignalType;
  message: string;
  event: HydraEvent;
  timestamp: number;
};

export type HydraHudSignalHandler = (signal: HydraHudSignal) => void;

export class HydraHudEventBridge {
  private handlers: HydraHudSignalHandler[] = [];
  private signals: HydraHudSignal[] = [];
  private maxSignals = 200;

  constructor(private readonly router: HydraEventRouter) {}

  start() {
    const unsubscribers = [
      this.router.onAny((routed) => this.emit(this.toLogSignal(routed))),
      this.router.on("hud_success", (routed) => this.emit(this.toSignal(routed, "success"))),
      this.router.on("hud_warning", (routed) => this.emit(this.toSignal(routed, "warning"))),
      this.router.on("hud_error", (routed) => this.emit(this.toSignal(routed, "error"))),
      this.router.on("hud_scene_start", (routed) => this.emit(this.toSignal(routed, "scene_start"))),
      this.router.on("hud_scene_done", (routed) => this.emit(this.toSignal(routed, "scene_done"))),
    ];

    return () => {
      for (const unsubscribe of unsubscribers) {
        unsubscribe();
      }
    };
  }

  onSignal(handler: HydraHudSignalHandler) {
    this.handlers = [...this.handlers, handler];
    return () => {
      this.handlers = this.handlers.filter((item) => item !== handler);
    };
  }

  getSignals() {
    return this.signals;
  }

  clear() {
    this.signals = [];
  }

  private emit(signal: HydraHudSignal) {
    this.signals = [...this.signals.slice(-(this.maxSignals - 1)), signal];
    for (const handler of this.handlers) {
      handler(signal);
    }
  }

  private toLogSignal(routed: HydraRoutedEvent): HydraHudSignal {
    return this.toSignal(routed, "log");
  }

  private toSignal(routed: HydraRoutedEvent, type: HydraHudSignalType): HydraHudSignal {
    return {
      id: `${routed.event.eventId}:${type}`,
      type,
      message: routed.message,
      event: routed.event,
      timestamp: Date.now(),
    };
  }
}
