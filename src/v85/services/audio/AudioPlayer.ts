import { Audio, AVPlaybackStatus } from "expo-av";
import { PlayOptions } from "./AudioTypes";

export default class AudioPlayer {

  private sound: Audio.Sound | null = null;

  private initialized = false;

  private playing = false;

  private volume = 1;

  async initialize() {

    if (this.initialized) {

      return;

    }

    await Audio.setAudioModeAsync({

      playsInSilentModeIOS: true,

      staysActiveInBackground: false,

      shouldDuckAndroid: true

    });

    this.initialized = true;

  }

  async play(
    source: any,
    options?: PlayOptions,
    onFinish?: () => void
  ) {

    await this.initialize();

    await this.stop();

    const { sound } =
      await Audio.Sound.createAsync(
        source,
        {
          shouldPlay:
            options?.shouldPlay ?? true,

          isLooping:
            options?.loop ?? false,

          volume:
            options?.volume ??
            this.volume
        }
      );

    this.sound = sound;

    this.playing = true;

    sound.setOnPlaybackStatusUpdate(

      (status: AVPlaybackStatus) => {

        if (!status.isLoaded) {

          return;

        }

        if (status.didJustFinish) {

          this.playing = false;

          onFinish?.();

        }

      }

    );

  }

  async stop() {

    if (!this.sound) {

      return;

    }

    try {

      await this.sound.stopAsync();

    } catch {}

    try {

      await this.sound.unloadAsync();

    } catch {}

    this.sound = null;

    this.playing = false;

  }

  async pause() {

    if (!this.sound) {

      return;

    }

    await this.sound.pauseAsync();

    this.playing = false;

  }

  async resume() {

    if (!this.sound) {

      return;

    }

    await this.sound.playAsync();

    this.playing = true;

  }

  async replay() {

    if (!this.sound) {

      return;

    }

    await this.sound.replayAsync();

    this.playing = true;

  }

  async setVolume(
    volume: number
  ) {

    this.volume = Math.min(
      1,
      Math.max(0, volume)
    );

    if (this.sound) {

      await this.sound.setVolumeAsync(
        this.volume
      );

    }

  }

  getVolume() {

    return this.volume;

  }

  isPlaying() {

    return this.playing;

  }

  async unload() {

    if (!this.sound) {

      return;

    }

    await this.sound.unloadAsync();

    this.sound = null;

    this.playing = false;

  }

}