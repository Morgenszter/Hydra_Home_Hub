import { HydraOfflineState } from "../offline/hydraOfflineState";
import {
  loadHydraOfflineState,
  patchHydraOfflineState,
  setHydraConnectionStage,
} from "../offline/hydraOfflineStorage";

export type HydraRecoveryBootstrapResult = {
  state: HydraOfflineState;
  bootSource: "cache" | "empty";
};

export class HydraRecoveryController {
  async bootstrap(): Promise<HydraRecoveryBootstrapResult> {
    const state = await loadHydraOfflineState();
    const hasCachedState =
      !!state.lastSuccessfulSyncAt ||
      Object.keys(state.deviceStates ?? {}).length > 0 ||
      state.recentEvents.length > 0;

    return {
      state,
      bootSource: hasCachedState ? "cache" : "empty",
    };
  }

  async onSocketConnecting(bridgeUrl: string) {
    return patchHydraOfflineState({
      lastConnectedBridge: bridgeUrl,
      connectionStage: "CONNECTING",
    });
  }

  async onSocketConnected() {
    return setHydraConnectionStage("CONNECTED");
  }

  async onSocketDegraded(reason: string) {
    return patchHydraOfflineState({
      connectionStage: "DEGRADED",
      recentEvents: [
        {
          type: "ANDROID_RECOVERY_DEGRADED",
          reason,
          timestamp: Date.now(),
        },
      ],
    });
  }

  async onReplayStarted() {
    return setHydraConnectionStage("REPLAYING");
  }

  async onReplayCompleted(snapshot: Partial<HydraOfflineState>) {
    return patchHydraOfflineState({
      ...snapshot,
      connectionStage: "READY",
      lastSuccessfulSyncAt: Date.now(),
    });
  }

  async onDisconnect() {
    return setHydraConnectionStage("DISCONNECTED");
  }
}
