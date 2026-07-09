import AudioManager from "./AudioManager";
import { AudioPriority } from "./AudioTypes";

class AudioNotifications {

  async success(
    id: string,
    source: any
  ) {

    await AudioManager.play(
      id,
      source,
      AudioPriority.NORMAL
    );

  }

  async warning(
    id: string,
    source: any
  ) {

    await AudioManager.play(
      id,
      source,
      AudioPriority.HIGH
    );

  }

  async error(
    id: string,
    source: any
  ) {

    await AudioManager.play(
      id,
      source,
      AudioPriority.CRITICAL
    );

  }

  async info(
    id: string,
    source: any
  ) {

    await AudioManager.play(
      id,
      source,
      AudioPriority.NORMAL
    );

  }

}

const audioNotifications =
  new AudioNotifications();

export default audioNotifications;