import { HydraQueuedVoiceLine } from "../services/hydraAudioEventBridge";
import { HydraVoiceCue, pickHydraVoiceAsset } from "./hydraVoiceManifest";

export type HydraAudioQueueStatus = "idle" | "playing" | "muted" | "error";

export type HydraAudioQueueItem = HydraQueuedVoiceLine & {
  assetId?: string;
  asset?: number;
};

export type HydraAudioQueueEngineOptions = {
  volume?: number;
  muted?: boolean;
  onLog?: (message: string) => void;
  onStatus?: (status: HydraAudioQueueStatus) => void;
};

type ExpoAvModule = {
  Audio: {
    Sound: {
      createAsync: (
        source: number,
        initialStatus?: Record<string, unknown>
      ) => Promise<{
        sound: {
          setOnPlaybackStatusUpdate: (listener: (status: any) => void) => void;
          unloadAsync: () => Promise<void>;
          replayAsync?: () => Promise<void>;
          playAsync?: () => Promise<void>;
        };
      }>;
    };
    setAudioModeAsync?: (mode: Record<string, unknown>) => Promise<void>;
  };
};

export class HydraAudioQueueEngine {
  private queue: HydraAudioQueueItem[] = [];
  private current: HydraAudioQueueItem | null = null;
  private status: HydraAudioQueueStatus = "idle";
  private volume: number;
  private muted: boolean;
  private sound: { unloadAsync: () => Promise<void> } | null = null;
  private listeners: Array<(state: ReturnType<HydraAudioQueueEngine["snapshot"]>) => void> = [];

  constructor(private readonly options: HydraAudioQueueEngineOptions = {}) {
    this.volume = options.volume ?? 0.9;
    this.muted = options.muted ?? false;
  }

  enqueue(line: HydraQueuedVoiceLine) {
    const manifestItem = pickHydraVoiceAsset(line.cue as HydraVoiceCue);
    const item: HydraAudioQueueItem = {
      ...line,
      text: manifestItem.text || line.text,
      assetId: manifestItem.id,
      asset: manifestItem.asset,
    };

    this.queue.push(item);
    this.emit();
    void this.pump();
  }

  enqueueCue(cue: HydraVoiceCue, eventId = `manual:${Date.now()}`) {
    const asset = pickHydraVoiceAsset(cue);
    this.enqueue({
      id: `${eventId}:${cue}`,
      cue,
      text: asset.text,
      eventId,
      createdAt: Date.now(),
    });
  }

  onChange(listener: (state: ReturnType<HydraAudioQueueEngine["snapshot"]>) => void) {
    this.listeners.push(listener);
    listener(this.snapshot());
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    if (muted) {
      this.status = "muted";
    } else if (!this.current) {
      this.status = "idle";
    }
    this.emit();
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.emit();
  }

  clear() {
    this.queue = [];
    this.current = null;
    this.status = this.muted ? "muted" : "idle";
    void this.unloadCurrentSound();
    this.emit();
  }

  completeCurrent() {
    this.current = null;
    this.status = this.muted ? "muted" : "idle";
    this.emit();
    void this.pump();
  }

  snapshot() {
    return {
      status: this.status,
      current: this.current,
      queue: [...this.queue],
      volume: this.volume,
      muted: this.muted,
    };
  }

  private async pump() {
    if (this.current || this.queue.length === 0) {
      return;
    }

    const next = this.queue.shift() ?? null;
    if (!next) {
      return;
    }

    this.current = next;
    this.status = this.muted ? "muted" : "playing";
    this.emit();

    if (this.muted) {
      this.options.onLog?.(`HYDRA audio muted: ${next.text}`);
      this.completeCurrent();
      return;
    }

    if (!next.asset) {
      this.options.onLog?.(`HYDRA voice fallback: ${next.text}`);
      this.completeCurrent();
      return;
    }

    try {
      await this.playAsset(next.asset);
    } catch (error) {
      this.status = "error";
      this.options.onLog?.(error instanceof Error ? error.message : "HYDRA audio error");
      this.emit();
      this.completeCurrent();
    }
  }

  private async playAsset(asset: number) {
    const expoAv = await this.loadExpoAv();
    if (!expoAv) {
      this.options.onLog?.("expo-av niedostępne, używam fallbacku tekstowego.");
      this.completeCurrent();
      return;
    }

    await expoAv.Audio.setAudioModeAsync?.({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    const { sound } = await expoAv.Audio.Sound.createAsync(asset, {
      shouldPlay: true,
      volume: this.volume,
    });

    this.sound = sound;
    sound.setOnPlaybackStatusUpdate((playbackStatus: any) => {
      if (playbackStatus?.didJustFinish) {
        void this.unloadCurrentSound();
        this.completeCurrent();
      }
    });

    if (sound.playAsync) {
      await sound.playAsync();
    }
  }

  private async unloadCurrentSound() {
    if (!this.sound) {
      return;
    }

    try {
      await this.sound.unloadAsync();
    } finally {
      this.sound = null;
    }
  }

  private async loadExpoAv(): Promise<ExpoAvModule | null> {
    try {
      return require("expo-av");
    } catch {
      return null;
    }
  }

  private emit() {
    this.options.onStatus?.(this.status);
    const snapshot = this.snapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }
}
