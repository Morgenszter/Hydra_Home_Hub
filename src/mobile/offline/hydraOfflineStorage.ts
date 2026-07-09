import {
  HYDRA_OFFLINE_STATE_KEY,
  HydraConnectionStage,
  HydraOfflineState,
  createEmptyHydraOfflineState,
} from "./hydraOfflineState";

let memoryState: HydraOfflineState = createEmptyHydraOfflineState();

function loadSecureStoreSync(): any | null {
  try {
    return require("expo-secure-store");
  } catch {
    return null;
  }
}

export async function loadHydraOfflineState(): Promise<HydraOfflineState> {
  const store = loadSecureStoreSync();
  if (store?.getItemAsync) {
    const raw = await store.getItemAsync(HYDRA_OFFLINE_STATE_KEY);
    return raw ? JSON.parse(raw) : createEmptyHydraOfflineState();
  }
  return memoryState;
}

export async function saveHydraOfflineState(state: HydraOfflineState): Promise<void> {
  const next = {
    ...state,
    recentEvents: state.recentEvents.slice(-100),
    hudReactions: state.hudReactions.slice(-50),
  };

  const store = loadSecureStoreSync();
  if (store?.setItemAsync) {
    await store.setItemAsync(HYDRA_OFFLINE_STATE_KEY, JSON.stringify(next));
  }
  memoryState = next;
}

export async function patchHydraOfflineState(
  patch: Partial<HydraOfflineState>
): Promise<HydraOfflineState> {
  const current = await loadHydraOfflineState();
  const next = { ...current, ...patch };
  await saveHydraOfflineState(next);
  return next;
}

export async function setHydraConnectionStage(
  connectionStage: HydraConnectionStage
): Promise<HydraOfflineState> {
  return patchHydraOfflineState({ connectionStage });
}
