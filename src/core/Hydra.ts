import Bootstrap from "./Bootstrap";

import Config from "./Config";

import Version from "./Version";

class Hydra {

  private initialized = false;

  async initialize() {

    if (this.initialized) {

      return;

    }

    await Bootstrap.start();

    this.initialized = true;

  }

  version() {

    return Version;

  }

  config() {

    return Config;

  }

  ready() {

    return this.initialized;

  }

}

const hydra = new Hydra();

export default hydra;