import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_HYDRA_BRIDGE_URL } from "../constants/hydraBridge";
import { useHydraBridge } from "../hooks/useHydraBridge";
import { loadHydraBridgeUrl, saveHydraBridgeUrl } from "../services/hydraStorage";

type HydraBridgeContextValue = ReturnType<typeof useHydraBridge> & {
  isBootstrapped: boolean;
  updateBridgeUrl: (value: string) => Promise<void>;
};

const HydraBridgeContext = createContext<HydraBridgeContextValue | null>(null);

export function HydraBridgeProvider({ children }: { children: ReactNode }) {
  const [isBootstrapped, setBootstrapped] = useState(false);
  const [storedUrl, setStoredUrl] = useState(DEFAULT_HYDRA_BRIDGE_URL);

  useEffect(() => {
    let mounted = true;

    loadHydraBridgeUrl(DEFAULT_HYDRA_BRIDGE_URL)
      .then((value) => {
        if (mounted) {
          setStoredUrl(value);
        }
      })
      .finally(() => {
        if (mounted) {
          setBootstrapped(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const bridge = useHydraBridge({
    baseUrl: storedUrl,
    autoRefreshMs: isBootstrapped ? 5000 : undefined,
  });

  const updateBridgeUrl = useCallback(async (value: string) => {
    const normalized = value.trim().replace(/\/+$/, "");
    await saveHydraBridgeUrl(normalized);
    setStoredUrl(normalized);
    bridge.setBaseUrl(normalized);
  }, [bridge]);

  const value = useMemo<HydraBridgeContextValue>(() => ({
    ...bridge,
    isBootstrapped,
    updateBridgeUrl,
  }), [bridge, isBootstrapped, updateBridgeUrl]);

  return (
    <HydraBridgeContext.Provider value={value}>
      {children}
    </HydraBridgeContext.Provider>
  );
}

export function useHydraBridgeContext() {
  const value = useContext(HydraBridgeContext);
  if (!value) {
    throw new Error("useHydraBridgeContext musi być użyty wewnątrz HydraBridgeProvider.");
  }
  return value;
}
