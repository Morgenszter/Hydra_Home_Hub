import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HydraBridgeClient, HydraBridgeError } from "../services/hydraBridgeClient";
import {
  HydraCommandRecord,
  HydraDevice,
  HydraEvent,
  HydraScene,
} from "../types/hydraProtocol";
import { DEFAULT_HYDRA_BRIDGE_URL } from "../constants/hydraBridge";

export type HydraBridgeConnectionState = "idle" | "connecting" | "online" | "offline" | "error";

export type UseHydraBridgeOptions = {
  baseUrl?: string;
  autoRefreshMs?: number;
};

export function useHydraBridge(options: UseHydraBridgeOptions = {}) {
  const [baseUrl, setBaseUrlState] = useState(options.baseUrl ?? DEFAULT_HYDRA_BRIDGE_URL);
  const [connectionState, setConnectionState] = useState<HydraBridgeConnectionState>("idle");
  const [devices, setDevices] = useState<HydraDevice[]>([]);
  const [scenes, setScenes] = useState<HydraScene[]>([]);
  const [events, setEvents] = useState<HydraEvent[]>([]);
  const [lastCommand, setLastCommand] = useState<HydraCommandRecord | null>(null);
  const [error, setError] = useState<string | null>(null);

  const client = useMemo(() => new HydraBridgeClient({ baseUrl }), [baseUrl]);
  const refreshTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const setBaseUrl = useCallback((value: string) => {
    setBaseUrlState(value.trim().replace(/\/+$/, ""));
  }, []);

  const refresh = useCallback(async () => {
    setConnectionState((current) => (current === "idle" ? "connecting" : current));
    try {
      const [status, sceneList] = await Promise.all([
        client.status(),
        client.scenes(),
      ]);
      setDevices(status.devices);
      setEvents(status.events);
      setScenes(sceneList);
      setConnectionState("online");
      setError(null);
    } catch (caught) {
      setConnectionState("offline");
      setError(normalizeBridgeError(caught));
    }
  }, [client]);

  const sendCommand = useCallback(async (deviceId: string, command: string, params: Record<string, unknown> = {}) => {
    try {
      const result = await client.sendDeviceCommand(deviceId, { command, params });
      setLastCommand(result);
      await refresh();
      return result;
    } catch (caught) {
      setError(normalizeBridgeError(caught));
      setConnectionState("error");
      throw caught;
    }
  }, [client, refresh]);

  const runScene = useCallback(async (sceneId: string) => {
    try {
      const result = await client.runScene(sceneId);
      setLastCommand(result);
      await refresh();
      return result;
    } catch (caught) {
      setError(normalizeBridgeError(caught));
      setConnectionState("error");
      throw caught;
    }
  }, [client, refresh]);

  const appendEvent = useCallback((event: HydraEvent) => {
    setEvents((current) => [...current.slice(-199), event]);
  }, []);

  useEffect(() => {
    refresh();

    if (options.autoRefreshMs && options.autoRefreshMs > 0) {
      refreshTimer.current = setInterval(refresh, options.autoRefreshMs);
      return () => {
        if (refreshTimer.current) {
          clearInterval(refreshTimer.current);
        }
      };
    }

    return undefined;
  }, [options.autoRefreshMs, refresh]);

  return {
    baseUrl,
    setBaseUrl,
    client,
    connectionState,
    devices,
    scenes,
    events,
    lastCommand,
    error,
    refresh,
    sendCommand,
    runScene,
    appendEvent,
  };
}

function normalizeBridgeError(error: unknown) {
  if (error instanceof HydraBridgeError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Nieznany błąd połączenia HYDRA Bridge.";
}
