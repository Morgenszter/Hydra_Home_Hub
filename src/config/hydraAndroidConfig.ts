export type HydraAndroidBuildMode = "development" | "preview" | "production";

export const HYDRA_ANDROID_CONFIG = {
  appId: "com.alphariusomegon.hydrahome",
  displayName: "Hydra Home",
  versionName: "1.0.0",
  versionCode: 86,
  defaultBridgeUrl: "http://192.168.1.100:8765",
  defaultBridgeWsUrl: "ws://192.168.1.100:8765/ws/runtime",
  udpDiscoveryPort: 5555,
  reconnectIntervalMs: 5000,
  bootDurationMs: 900,
  guiProfile: "v85-alpha-visual-upgrade",
  androidPermissions: [
    "INTERNET",
    "ACCESS_NETWORK_STATE",
    "ACCESS_WIFI_STATE",
    "CHANGE_WIFI_MULTICAST_STATE",
    "BLUETOOTH",
    "BLUETOOTH_ADMIN",
    "BLUETOOTH_SCAN",
    "BLUETOOTH_CONNECT",
    "ACCESS_FINE_LOCATION",
    "VIBRATE"
  ]
} as const;
