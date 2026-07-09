export interface HydraConfig {

  debug: boolean;

  audio: {

    volume: number;

    enabled: boolean;

  };

  bluetooth: {

    enabled: boolean;

    autoScan: boolean;

  };

  bridge: {

    enabled: boolean;

    host: string;

    port: number;

  };

}

const config: HydraConfig = {

  debug: true,

  audio: {

    volume: 1,

    enabled: true

  },

  bluetooth: {

    enabled: true,

    autoScan: true

  },

  bridge: {

    enabled: true,

    host: "127.0.0.1",

    port: 8080

  }

};

export default config;