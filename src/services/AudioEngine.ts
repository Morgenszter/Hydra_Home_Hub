import AudioPlayer from "./audio/AudioPlayer";
import AudioQueue from "./audio/AudioQueue";
import AudioCache from "./audio/AudioCache";

import {
  AudioPriority,
  PlayOptions,
  QueueItem
} from "./audio/AudioTypes";

class AudioEngineClass {

  private player = new AudioPlayer();

  private queue = new AudioQueue();

  private cache = new AudioCache();

  private processing = false;

  async play(
    source: any,
    options?: PlayOptions
  ) {

    await this.player.play(
      source,
      options
    );

  }

  enqueue(
    id: string,
    source: any,
    priority = AudioPriority.NORMAL,
    options?: PlayOptions
  ) {

    this.queue.enqueue({

      id,

      source,

      priority,

      options

    });

    void this.process();

  }

  private async process() {

    if (this.processing) {

      return;

    }

    this.processing = true;

    while (!this.queue.isEmpty()) {

      const item =
        this.queue.dequeue() as QueueItem;

      await this.player.play(

        item.source,

        item.options

      );

      while (this.player.isPlaying()) {

        await new Promise(

          resolve =>

            setTimeout(resolve, 100)

        );

      }

    }

    this.processing = false;

  }

  async preload(

    id: string,

    source: any

  ) {

    await this.cache.preload(

      id,

      source

    );

  }

  async stop() {

    this.queue.clear();

    await this.player.stop();

  }

  async pause() {

    await this.player.pause();

  }

  async resume() {

    await this.player.resume();

  }

  async replay() {

    await this.player.replay();

  }

  async unload() {

    await this.player.unload();

    await this.cache.unloadAll();

  }

  async setVolume(

    value: number

  ) {

    await this.player.setVolume(

      value

    );

  }

  getVolume() {

    return this.player.getVolume();

  }

  isPlaying() {

    return this.player.isPlaying();

  }

  queueSize() {

    return this.queue.size();

  }

  getQueue() {

    return this.queue.getAll();

  }

}

const AudioEngine =
  new AudioEngineClass();

export default AudioEngine;