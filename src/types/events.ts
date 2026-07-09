export interface HydraEvent<T = unknown> {
  type: string;
  payload?: T;
  timestamp: number;
}

export type EventCallback<T = unknown> = (event: HydraEvent<T>) => void;

export interface EventSubscription {
  unsubscribe(): void;
}