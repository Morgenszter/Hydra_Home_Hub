export const DEFAULT_HYDRA_BRIDGE_URL = "http://localhost:8765";

export const HYDRA_DEVICE_IDS = {
  lotus: "lotus_ble_main",
  tapo: "tapo_l630_main",
  heater: "heater_wifi_main",
} as const;

export const HYDRA_SCENE_IDS = {
  redAlert: "red_alert",
  nightOps: "night_ops",
  sectorHeat: "sector_heat",
} as const;
