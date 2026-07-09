import { Audio } from "expo-av";

export default class AudioCache {

  private cache = new Map<string, Audio.Sound>();

  async preload(
    id: string,
    source: any,
    volume = 1
  ) {

    if (this.cache.has(id)) {

      return;

    }

    const { sound } =
      await Audio.Sound.createAsync(
        source,
        {
          shouldPlay: false,
          volume
        }
      );

    this.cache.set(
      id,
      sound
    );

  }

  get(
    id: string
  ) {

    return this.cache.get(id);

  }

  has(
    id: string
  ) {

    return this.cache.has(id);

  }

  async unload(
    id: string
  ) {

    const sound =
      this.cache.get(id);

    if (!sound) {

      return;

    }

    try {

      await sound.unloadAsync();

    } catch {}

    this.cache.delete(id);

  }

  async unloadAll() {

    for (const sound of this.cache.values()) {

      try {

        await sound.unloadAsync();

      } catch {}

    }

    this.cache.clear();

  }

  size() {

    return this.cache.size;

  }

  keys() {

    return Array.from(
      this.cache.keys()
    );

  }

}