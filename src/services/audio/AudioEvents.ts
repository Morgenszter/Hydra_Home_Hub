import { EventEmitter } from "events";
import { AudioEvent } from "./AudioTypes";

export interface AudioEventPayload {

  type: AudioEvent;

  id?: string;

  source?: any;

  error?: unknown;

  timestamp: number;

}

class AudioEvents {

  private emitter = new EventEmitter();

  on(
    event: AudioEvent,
    listener: (payload: AudioEventPayload) => void
  ) {

    this.emitter.on(
      event,
      listener
    );

  }

  once(
    event: AudioEvent,
    listener: (payload: AudioEventPayload) => void
  ) {

    this.emitter.once(
      event,
      listener
    );

  }

  off(
    event: AudioEvent,
    listener: (payload: AudioEventPayload) => void
  ) {

    this.emitter.off(
      event,
      listener
    );

  }

  emit(
    event: AudioEvent,
    payload: Partial<AudioEventPayload> = {}
  ) {

    this.emitter.emit(
      event,
      {
        ...payload,
        type: event,
        timestamp: Date.now()
      }
    );

  }

  removeAll() {

    this.emitter.removeAllListeners();

  }

}

const audioEvents = new AudioEvents();

export default audioEvents;