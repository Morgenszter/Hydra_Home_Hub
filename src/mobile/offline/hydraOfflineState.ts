export type HydraConnectionStage =
  | "DISCONNECTED"
  | "PROBING"
  | "PAIRING_REQUIRED"
  | "CONNECTING"
  | "CONNECTED"
  | "DEGRADED"
  | "REPLAYING"
  | "READY";

export type HydraOfflineState = {
  sessionState: Record<string, unknown> | null;
  deviceStates: Record<string, unknown>;
  alertState: Record<string, unknown> | null;
  sceneState: Record<string, unknown> | null;
  recentEvents: Array<Record<string, unknown>>;
  hudReactions: Array<Record<string, unknown>>;
  lastConnectedBridge: string | null;
  trustedPairingInfo: Record<string, unknown> | null;
  lastSuccessfulSyncAt: number | null;
  connectionStage: HydraConnectionStage;
};

export const HYDRA_OFFLINE_STATE_KEY = "hydra.offline.state.v65";

export const createEmptyHydraOfflineState = (): HydraOfflineState => ({
  sessionState: null,
  deviceStates: {},
  alertState: null,
  sceneState: null,
  recentEvents: [],
  hudReactions: [],
  lastConnectedBridge: null,
  trustedPairingInfo: null,
  lastSuccessfulSyncAt: null,
  connectionStage: "DISCONNECTED",
});
