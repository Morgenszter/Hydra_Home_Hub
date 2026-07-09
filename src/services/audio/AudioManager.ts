import AudioEngine from "../AudioEngine";

import AudioEvents from "./AudioEvents";

import {
  AudioPriority,
  PlayOptions
} from "./AudioTypes";

class AudioManager {

  private initialized = false;

  async initialize() {

    if (this.initialized) {

      return;

    }

    this.initialized = true;

  }

  async play(

    id: string,

    source: any,

    priority: AudioPriority = AudioPriority.NORMAL,

    options?: PlayOptions

  ) {

    await this.initialize();

    AudioEvents.emit("play", {

      id,

      source

    });

    AudioEngine.enqueue(

      id,

      source,

      priority,

      options

    );

  }

  async playImmediate(

    source: any,

    options?: PlayOptions

  ) {

    await this.initialize();

    AudioEvents.emit("play");

    await AudioEngine.play(

      source,

      options

    );

  }

  async stop() {

    await AudioEngine.stop();

    AudioEvents.emit("stop");

  }

  async pause() {

    await AudioEngine.pause();

    AudioEvents.emit("pause");

  }

  async resume() {

    await AudioEngine.resume();

    AudioEvents.emit("resume");

  }

  async replay() {

    await AudioEngine.replay();

  }

  async preload(

    id: string,

    source: any

  ) {

    await AudioEngine.preload(

      id,

      source

    );

  }

  async unload() {

    await AudioEngine.unload();

  }

  async setVolume(

    value: number

  ) {

    await AudioEngine.setVolume(

      value

    );

  }

  getVolume() {

    return AudioEngine.getVolume();

  }

  isPlaying() {

    return AudioEngine.isPlaying();

  }

  queueSize() {

    return AudioEngine.queueSize();

  }

  queue() {

    return AudioEngine.getQueue();

  }

}

const audioManager = new AudioManager();

export default audioManager;