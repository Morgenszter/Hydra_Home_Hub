import { HydraEvent } from "../../types/hydraProtocol";
import { HydraAudioEventBridge, HydraQueuedVoiceLine } from "../../services/hydraAudioEventBridge";
import { HydraEventRouter, hydraEventRouter, HydraRoutedEvent } from "../../services/hydraEventRouter";
import { HydraHudEventBridge, HydraHudSignal } from "../../services/hydraHudEventBridge";

export type HydraProtocolEngineHandlers = {
  onRoutedEvent?: (event: HydraRoutedEvent) => void;
  onHudSignal?: (signal: HydraHudSignal) => void;
  onVoiceLine?: (line: HydraQueuedVoiceLine) => void;
};

export class HydraProtocolEngine {
  readonly router: HydraEventRouter;
  readonly hud: HydraHudEventBridge;
  readonly audio: HydraAudioEventBridge;

  private stopHandlers: Array<() => void> = [];
  private active = false;

  constructor(router: HydraEventRouter = hydraEventRouter) {
    this.router = router;
    this.hud = new HydraHudEventBridge(router);
    this.audio = new HydraAudioEventBridge(router);
  }

  boot(handlers: HydraProtocolEngineHandlers = {}) {
    if (this.active) {
      return;
    }

    this.active = true;
    this.stopHandlers = [
      this.hud.start(),
      this.audio.start(),
    ];

    if (handlers.onRoutedEvent) {
      this.stopHandlers.push(this.router.onAny(handlers.onRoutedEvent));
    }

    if (handlers.onHudSignal) {
      this.stopHandlers.push(this.hud.onSignal(handlers.onHudSignal));
    }

    if (handlers.onVoiceLine) {
      this.stopHandlers.push(this.audio.onVoiceLine(handlers.onVoiceLine));
    }
  }

  shutdown() {
    for (const stop of this.stopHandlers) {
      stop();
    }

    this.stopHandlers = [];
    this.active = false;
  }

  ingest(event: HydraEvent) {
    return this.router.route(event);
  }

  isActive() {
    return this.active;
  }
}

export const hydraProtocolEngine = new HydraProtocolEngine();
