class AudioMixer {

  private master = 1;

  private voice = 1;

  private effects = 1;

  private ambient = 1;

  setMaster(
    value: number
  ) {

    this.master = value;

  }

  setVoice(
    value: number
  ) {

    this.voice = value;

  }

  setEffects(
    value: number
  ) {

    this.effects = value;

  }

  setAmbient(
    value: number
  ) {

    this.ambient = value;

  }

  getState() {

    return {

      master: this.master,

      voice: this.voice,

      effects: this.effects,

      ambient: this.ambient

    };

  }

}

const audioMixer =
  new AudioMixer();

export default audioMixer;