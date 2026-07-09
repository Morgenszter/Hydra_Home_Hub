import { useEffect, useState } from "react";
import {
  HydraConnectionStage,
  HydraOfflineState,
  createEmptyHydraOfflineState,
} from "../mobile/offline/hydraOfflineState";
import {
  loadHydraOfflineState,
  patchHydraOfflineState,
  setHydraConnectionStage,
} from "../mobile/offline/hydraOfflineStorage";

export function useHydraOfflineRecovery() {
  const [state, setState] = useState<HydraOfflineState>(createEmptyHydraOfflineState());

  useEffect(() => {
    loadHydraOfflineState().then(setState);
  }, []);

  async function setStage(stage: HydraConnectionStage) {
    const next = await setHydraConnectionStage(stage);
    setState(next);
    return next;
  }

  async function patch(patchValue: Partial<HydraOfflineState>) {
    const next = await patchHydraOfflineState(patchValue);
    setState(next);
    return next;
  }

  return {
    state,
    setStage,
    patch,
    isOffline: state.connectionStage === "DISCONNECTED" || state.connectionStage === "DEGRADED",
  };
}
