export interface PlayOptions {
  loop?: boolean;
  volume?: number;
  shouldPlay?: boolean;
  fadeIn?: number;
  fadeOut?: number;
}

export interface QueueItem {
  id: string;
  source: any;
  priority: number;
  createdAt: number;
  options?: PlayOptions;
}

export interface AudioState {
  initialized: boolean;
  playing: boolean;
  muted: boolean;
  volume: number;
}

export enum AudioPriority {
  LOW = 25,
  NORMAL = 100,
  HIGH = 250,
  CRITICAL = 1000
}

export type AudioEvent =
  | "play"
  | "stop"
  | "pause"
  | "resume"
  | "finish"
  | "error";