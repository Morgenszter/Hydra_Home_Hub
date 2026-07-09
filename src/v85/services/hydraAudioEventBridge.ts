import { HydraEventRouter, HydraRoutedEvent } from "./hydraEventRouter";

export type HydraVoiceCue =
  | "acknowledged"
  | "completed"
  | "failed"
  | "offline"
  | "scene_completed";

export type HydraQueuedVoiceLine = {
  id: string;
  cue: HydraVoiceCue;
  text: string;
  eventId: string;
  createdAt: number;
};

export class HydraAudioEventBridge {
  private queue: HydraQueuedVoiceLine[] = [];
  private playing = false;
  private listeners: Array<(line: HydraQueuedVoiceLine) => void> = [];

  constructor(private readonly router: HydraEventRouter) {}

  start() {
    const unsubscribers = [
      this.router.on("audio_ack", (routed) => this.enqueue("acknowledged", routed)),
      this.router.on("audio_completed", (routed) => this.enqueue("completed", routed)),
      this.router.on("audio_failed", (routed) => this.enqueue("failed", routed)),
      this.router.on("audio_offline", (routed) => this.enqueue("offline", routed)),
    ];

    return () => {
      for (const unsubscribe of unsubscribers) {
        unsubscribe();
      }
    };
  }

  onVoiceLine(handler: (line: HydraQueuedVoiceLine) => void) {
    this.listeners = [...this.listeners, handler];
    return () => {
      this.listeners = this.listeners.filter((item) => item !== handler);
    };
  }

  getQueue() {
    return this.queue;
  }

  clear() {
    this.queue = [];
    this.playing = false;
  }

  markCurrentCompleted() {
    this.queue = this.queue.slice(1);
    this.playing = false;
    this.pump();
  }

  private enqueue(cue: HydraVoiceCue, routed: HydraRoutedEvent) {
    const line: HydraQueuedVoiceLine = {
      id: `${routed.event.eventId}:${cue}`,
      cue,
      text: selectVoiceLine(cue),
      eventId: routed.event.eventId,
      createdAt: Date.now(),
    };

    this.queue = [...this.queue, line];
    this.pump();
  }

  private pump() {
    if (this.playing || this.queue.length === 0) {
      return;
    }

    this.playing = true;
    const current = this.queue[0];
    for (const listener of this.listeners) {
      listener(current);
    }
  }
}

function selectVoiceLine(cue: HydraVoiceCue) {
  const lines: Record<HydraVoiceCue, string[]> = {
    acknowledged: [
      "Rozkaz przyjęty.",
      "Potwierdzam.",
      "Sekwencja rozpoczęta.",
      "Przyjęto do wykonania.",
    ],
    completed: [
      "Wykonano.",
      "Operacja zakończona.",
      "Cel osiągnięty.",
      "Protokół zakończony.",
    ],
    failed: [
      "Błąd protokołu.",
      "Rozkaz nie został wykonany.",
      "Wystąpiła anomalia.",
      "Sekwencja przerwana.",
    ],
    offline: [
      "Utracono kontakt z urządzeniem.",
      "Sygnał urządzenia zanikł.",
      "Jednostka niedostępna.",
      "Łącze przerwane.",
    ],
    scene_completed: [
      "Scena zakończona.",
      "Układ taktyczny aktywny.",
      "Konfiguracja sektora gotowa.",
      "Scena wykonana.",
    ],
  };

  const options = lines[cue];
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}
