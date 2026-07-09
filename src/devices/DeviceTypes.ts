export enum DeviceType {

  LOTUS = "lotus",

  TAPO = "tapo",

  HEATER = "heater",

  BLE = "ble",

  WIFI = "wifi",

  UNKNOWN = "unknown"

}

export enum DeviceState {

  OFFLINE = "offline",

  CONNECTING = "connecting",

  ONLINE = "online",

  ERROR = "error"

}

export interface DeviceInfo {

  id: string;

  name: string;

  type: DeviceType;

  state: DeviceState;

  battery?: number;

  ip?: string;

  mac?: string;

  rssi?: number;

  metadata?: Record<string, unknown>;

}