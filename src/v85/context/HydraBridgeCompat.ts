import { useHydraBridgeContext } from "./HydraBridgeProvider";

export function useHydraBridgeStatus() {
  const hydra = useHydraBridgeContext();

  return {
    bridgeUrl: hydra.baseUrl,
    connectionState: hydra.connectionState,
    isOnline: hydra.connectionState === "online",
    devices: hydra.devices,
    scenes: hydra.scenes,
    events: hydra.events,
    error: hydra.error,
    refresh: hydra.refresh,
    sendCommand: hydra.sendCommand,
    runScene: hydra.runScene,
    updateBridgeUrl: hydra.updateBridgeUrl,
  };
}

export function useHydraDevice(deviceId: string) {
  const hydra = useHydraBridgeContext();
  return hydra.devices.find((device) => device.id === deviceId) ?? null;
}
