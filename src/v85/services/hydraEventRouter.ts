import { HydraEvent } from "../types/hydraProtocol";
import { getPolishEventMessage, HydraProtocolIntent, mapHydraEventToProtocolIntents } from "./hydraProtocolMapper";

export type HydraRoutedEvent = {
  event: HydraEvent;
  message: string;
  intents: HydraProtocolIntent[];
  priority: number;
  createdAt: number;
};

export type HydraEventRouteHandler = (routed: HydraRoutedEvent) => void | Promise<void>;

export class HydraEventRouter {
  private handlers: Partial<Record<HydraProtocolIntent, HydraEventRouteHandler[]>> = {};
  private wildcardHandlers: HydraEventRouteHandler[] = [];
  private history: HydraRoutedEvent[] = [];
  private maxHistory = 250;

  on(intent: HydraProtocolIntent, handler: HydraEventRouteHandler) {
    this.handlers[intent] = [...(this.handlers[intent] ?? []), handler];
    return () => this.off(intent, handler);
  }

  onAny(handler: HydraEventRouteHandler) {
    this.wildcardHandlers = [...this.wildcardHandlers, handler];
    return () => {
      this.wildcardHandlers = this.wildcardHandlers.filter((item) => item !== handler);
    };
  }

  off(intent: HydraProtocolIntent, handler: HydraEventRouteHandler) {
    this.handlers[intent] = (this.handlers[intent] ?? []).filter((item) => item !== handler);
  }

  route(event: HydraEvent) {
    const routed: HydraRoutedEvent = {
      event,
      message: getPolishEventMessage(event),
      intents: mapHydraEventToProtocolIntents(event),
      priority: calculatePriority(event),
      createdAt: Date.now(),
    };

    this.history = [...this.history.slice(-(this.maxHistory - 1)), routed];

    for (const handler of this.wildcardHandlers) {
      void handler(routed);
    }

    for (const intent of routed.intents) {
      for (const handler of this.handlers[intent] ?? []) {
        void handler(routed);
      }
    }

    return routed;
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
  }
}

export const hydraEventRouter = new HydraEventRouter();

function calculatePriority(event: HydraEvent) {
  if (event.severity === "critical") return 100;
  if (event.severity === "error") return 90;
  if (event.type.includes("FAILED")) return 85;
  if (event.type.includes("OFFLINE")) return 80;
  if (event.type.includes("COMPLETED")) return 60;
  if (event.type.includes("ACK")) return 40;
  return 20;
}
