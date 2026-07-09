

export {};

// HYDRA_COMPAT_EVENTBUS_EXPORTS
export type HydraEventPayload = Record<string, unknown>;

export class HydraBus {
  private listeners: Record<string, Array<(payload: HydraEventPayload) => void>> = {};

  on(event: string, listener: (payload: HydraEventPayload) => void) {
    this.listeners[event] = [...(this.listeners[event] ?? []), listener];
    return () => this.off(event, listener);
  }

  off(event: string, listener: (payload: HydraEventPayload) => void) {
    this.listeners[event] = (this.listeners[event] ?? []).filter((item) => item !== listener);
  }

  emit(event: string, payload: HydraEventPayload = {}) {
    for (const listener of this.listeners[event] ?? []) {
      listener(payload);
    }
  }
}

export default HydraBus;
