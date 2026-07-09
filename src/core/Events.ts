export const Events = {

  HYDRA: {

    STARTUP: "hydra:startup",

    READY: "hydra:ready",

    SHUTDOWN: "hydra:shutdown",

    ERROR: "hydra:error"

  },

  AUDIO: {

    PLAY: "audio:play",

    STOP: "audio:stop",

    PAUSE: "audio:pause",

    RESUME: "audio:resume",

    FINISH: "audio:finish",

    ERROR: "audio:error"

  },

  VOICE: {

    LISTEN_START: "voice:listen:start",

    LISTEN_STOP: "voice:listen:stop",

    COMMAND: "voice:command",

    RESPONSE: "voice:response"

  },

  BLE: {

    CONNECT: "ble:connect",

    DISCONNECT: "ble:disconnect",

    DISCOVER: "ble:discover",

    DATA: "ble:data",

    ERROR: "ble:error"

  },

  WIFI: {

    CONNECT: "wifi:connect",

    DISCONNECT: "wifi:disconnect"

  },

  DEVICE: {

    ADDED: "device:added",

    REMOVED: "device:removed",

    UPDATED: "device:updated",

    STATE: "device:state"

  },

  LOTUS: {

    CONNECTED: "lotus:connected",

    DISCONNECTED: "lotus:disconnected",

    MODE_CHANGED: "lotus:mode",

    BATTERY: "lotus:battery"

  },

  TAPO: {

    CONNECTED: "tapo:connected",

    DISCONNECTED: "tapo:disconnected",

    POWER: "tapo:power",

    BRIGHTNESS: "tapo:brightness",

    COLOR: "tapo:color"

  },

  HEATER: {

    CONNECTED: "heater:connected",

    DISCONNECTED: "heater:disconnected",

    TEMPERATURE: "heater:temperature",

    POWER: "heater:power"

  },

  SCENE: {

    START: "scene:start",

    STOP: "scene:stop",

    COMPLETE: "scene:complete"

  },

  AI: {

    REQUEST: "ai:request",

    RESPONSE: "ai:response",

    ERROR: "ai:error"

  }

} as const;

export default Events;