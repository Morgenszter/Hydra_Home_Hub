import AudioManager from "./AudioManager";

class AudioCommands {

  async stop() {

    await AudioManager.stop();

  }

  async pause() {

    await AudioManager.pause();

  }

  async resume() {

    await AudioManager.resume();

  }

  async replay() {

    await AudioManager.replay();

  }

  async volume(
    value:number
  ){

    await AudioManager.setVolume(
      value
    );

  }

  async mute(){

    await AudioManager.setVolume(
      0
    );

  }

}

const audioCommands =
  new AudioCommands();

export default audioCommands;