import AudioManager from "./AudioManager";
import { AudioPriority, PlayOptions } from "./AudioTypes";

export interface VoiceMessage {

  id: string;

  source: any;

  priority?: AudioPriority;

  options?: PlayOptions;

}

class AudioVoice {

  async speak(
    message: VoiceMessage
  ) {

    await AudioManager.play(

      message.id,

      message.source,

      message.priority ??
        AudioPriority.HIGH,

      message.options

    );

  }

  async alert(
    id: string,
    source: any
  ) {

    await AudioManager.play(

      id,

      source,

      AudioPriority.CRITICAL

    );

  }

  async notification(
    id: string,
    source: any
  ) {

    await AudioManager.play(

      id,

      source,

      AudioPriority.NORMAL

    );

  }

  async ambient(
    id: string,
    source: any
  ) {

    await AudioManager.play(

      id,

      source,

      AudioPriority.LOW

    );

  }

}

const audioVoice = new AudioVoice();

export default audioVoice;