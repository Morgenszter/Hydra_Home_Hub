type EventHandler<T = any> = (payload: T) => void | Promise<void>;

class EventBus {

  private listeners = new Map<string, Set<EventHandler>>();

  on<T = any>(
    event: string,
    handler: EventHandler<T>
  ) {

    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler as EventHandler);

  }

  off<T = any>(
    event: string,
    handler: EventHandler<T>
  ) {

    this.listeners.get(event)?.delete(handler as EventHandler);

  }

  async emit<T = any>(
    event: string,
    payload?: T
  ) {

    const handlers = this.listeners.get(event);

    if (!handlers) {
      return;
    }

    for (const handler of handlers) {
      await handler(payload);
    }

  }

  once<T = any>(
    event: string,
    handler: EventHandler<T>
  ) {

    const wrapper: EventHandler<T> = async (payload) => {

      this.off(event, wrapper);

      await handler(payload);

    };

    this.on(event, wrapper);

  }

  clear() {

    this.listeners.clear();

  }

}

const eventBus = new EventBus();

export default eventBus;