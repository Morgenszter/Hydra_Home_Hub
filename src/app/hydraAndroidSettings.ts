import { HYDRA_ANDROID_CONFIG } from "../config/hydraAndroidConfig";

export type HydraAndroidSettings = {
  bridgeWsUrl: string;
  apiBaseUrl: string;
  mode: "cockpit" | "operator" | "alpha";
};

const KEY = "hydra.android.settings.v84";
let memorySettings: HydraAndroidSettings | null = null;

function fallback(): HydraAndroidSettings {
  return {
    bridgeWsUrl: HYDRA_ANDROID_CONFIG.defaultBridgeWsUrl,
    apiBaseUrl: HYDRA_ANDROID_CONFIG.defaultBridgeUrl,
    mode: "cockpit",
  };
}

export async function loadHydraAndroidSettings(): Promise<HydraAndroidSettings> {
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      return { ...fallback(), ...JSON.parse(raw) };
    }
  } catch {}
  return memorySettings ?? fallback();
}

export async function saveHydraAndroidSettings(settings: HydraAndroidSettings): Promise<void> {
  memorySettings = settings;
  try {
    const AsyncStorage = require("@react-native-async-storage/async-storage").default;
    await AsyncStorage.setItem(KEY, JSON.stringify(settings));
  } catch {}
}
