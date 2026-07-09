const HYDRA_BRIDGE_URL_KEY = "HYDRA_BRIDGE_URL";

type StorageLike = {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
};

let memoryStorage: Record<string, string> = {};

function loadAsyncStorageSync(): StorageLike | null {
  try {
    const loaded = require("@react-native-async-storage/async-storage");
    return loaded?.default ?? loaded;
  } catch {
    return null;
  }
}

const fallbackStorage: StorageLike = {
  async getItem(key: string) {
    return memoryStorage[key] ?? null;
  },
  async setItem(key: string, value: string) {
    memoryStorage[key] = value;
  },
  async removeItem(key: string) {
    delete memoryStorage[key];
  },
};

function getStorage(): StorageLike {
  return loadAsyncStorageSync() ?? fallbackStorage;
}

export async function loadHydraBridgeUrl(defaultValue: string): Promise<string> {
  const storage = getStorage();
  const value = await storage.getItem(HYDRA_BRIDGE_URL_KEY);
  return value?.trim() || defaultValue;
}

export async function saveHydraBridgeUrl(value: string): Promise<void> {
  const storage = getStorage();
  await storage.setItem(HYDRA_BRIDGE_URL_KEY, value.trim().replace(/\/+$/, ""));
}

export async function clearHydraBridgeUrl(): Promise<void> {
  const storage = getStorage();
  await storage.removeItem(HYDRA_BRIDGE_URL_KEY);
}
