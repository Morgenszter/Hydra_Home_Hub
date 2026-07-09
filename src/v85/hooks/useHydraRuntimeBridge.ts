import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type HydraLiveMessage =
  | { type: "HYDRA_RUNTIME_SNAPSHOT"; payload: any }
  | { type: "HYDRA_LIVE_EVENT"; payload: any }
  | { type: "HYDRA_OPERATOR_RESULT"; payload: any }
  | { type: "HYDRA_VOICE_STATE_PATCH"; payload: any };

export type HydraBridgeState = {
  connected: boolean;
  isStale: boolean;
  attempt: number;
  lastLiveAt: number | null;
  runtimeSnapshot: any | null;
  recentEvents: any[];
  operatorResult: any | null;
  voicePatch: any | null;
};

const INITIAL: HydraBridgeState = {
  connected: false,
  isStale: false,
  attempt: 0,
  lastLiveAt: null,
  runtimeSnapshot: null,
  recentEvents: [],
  operatorResult: null,
  voicePatch: null,
};

export function useHydraRuntimeBridge(host: string) {
  const [state, setState] = useState<HydraBridgeState>(INITIAL);
  const wsRef = useRef<WebSocket | null>(null);
  const retryTimer = useRef<any>(null);

  const applyMessage = useCallback((message: HydraLiveMessage) => {
    setState(prev => {
      if (message.type === "HYDRA_RUNTIME_SNAPSHOT") {
        return { ...prev, runtimeSnapshot: message.payload, connected: true, isStale: false, lastLiveAt: Date.now() };
      }
      if (message.type === "HYDRA_LIVE_EVENT") {
        return { ...prev, recentEvents: [message.payload, ...prev.recentEvents].slice(0, 100), connected: true, isStale: false, lastLiveAt: Date.now() };
      }
      if (message.type === "HYDRA_OPERATOR_RESULT") {
        return { ...prev, operatorResult: message.payload, connected: true, isStale: false, lastLiveAt: Date.now() };
      }
      if (message.type === "HYDRA_VOICE_STATE_PATCH") {
        return { ...prev, voicePatch: message.payload, connected: true, isStale: false, lastLiveAt: Date.now() };
      }
      return prev;
    });
  }, []);

  const connect = useCallback(() => {
    if (!host) return;
    const ws = new WebSocket(host);
    wsRef.current = ws;

    ws.onopen = () => {
      setState(prev => ({ ...prev, connected: true, isStale: false, attempt: 0 }));
    };

    ws.onmessage = evt => {
      try {
        const parsed = JSON.parse(evt.data);
        applyMessage(parsed);
      } catch {}
    };

    ws.onclose = () => {
      setState(prev => ({ ...prev, connected: false, isStale: true, attempt: prev.attempt + 1 }));
      const nextAttempt = state.attempt + 1;
      const delay = Math.min(15000, 1000 * Math.max(1, nextAttempt));
      retryTimer.current = setTimeout(connect, delay);
    };

    ws.onerror = () => {
      try { ws.close(); } catch {}
    };
  }, [applyMessage, host, state.attempt]);

  useEffect(() => {
    connect();
    return () => {
      if (retryTimer.current) clearTimeout(retryTimer.current);
      try { wsRef.current?.close(); } catch {}
    };
  }, [connect]);

  const actions = useMemo(() => ({
    reconnect: () => {
      try { wsRef.current?.close(); } catch {}
      connect();
    },
  }), [connect]);

  return { state, actions };
}
