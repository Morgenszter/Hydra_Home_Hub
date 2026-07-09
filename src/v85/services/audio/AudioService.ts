import AudioEngine from "../AudioEngine";

import {
  AudioPriority,
  PlayOptions
} from "./AudioTypes";

class AudioService {

  async play(

    source: any,

    options?: PlayOptions

  ) {

    await AudioEngine.play(

      source,

      options

    );

  }

  playLow(

    id: string,

    source: any,

    options?: PlayOptions

  ) {

    AudioEngine.enqueue(

      id,

      source,

      AudioPriority.LOW,

      options

    );

  }

  playNormal(

    id: string,

    source: any,

    options?: PlayOptions

  ) {

    AudioEngine.enqueue(

      id,

      source,

      AudioPriority.NORMAL,

      options

    );

  }

  playHigh(

    id: string,

    source: any,

    options?: PlayOptions

  ) {

    AudioEngine.enqueue(

      id,

      source,

      AudioPriority.HIGH,

      options

    );

  }

  playCritical(

    id: string,

    source: any,

    options?: PlayOptions

  ) {

    AudioEngine.enqueue(

      id,

      source,

      AudioPriority.CRITICAL,

      options

    );

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

  async stop() {

    await AudioEngine.stop();

  }

  async pause() {

    await AudioEngine.pause();

  }

  async resume() {

    await AudioEngine.resume();

  }

  async replay() {

    await AudioEngine.replay();

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

  getQueue() {

    return AudioEngine.getQueue();

  }

}

const audioService = new AudioService();

export default audioService;