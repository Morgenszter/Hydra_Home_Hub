import { useEffect, useRef, useState } from "react";
import { HydraEvent } from "../types/hydraProtocol";

export type HydraEventStreamState = "idle" | "connecting" | "open" | "closed" | "error";

export function useHydraEventStream(
  streamUrl: string,
  onEvent: (event: HydraEvent) => void,
  enabled = true,
) {
  const [state, setState] = useState<HydraEventStreamState>("idle");
  const sourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!enabled || !streamUrl || typeof EventSource === "undefined") {
      return undefined;
    }

    setState("connecting");
    const source = new EventSource(streamUrl);
    sourceRef.current = source;

    source.onopen = () => setState("open");
    source.onerror = () => setState("error");
    source.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data) as HydraEvent;
        onEvent(event);
      } catch {
        setState("error");
      }
    };

    return () => {
      source.close();
      sourceRef.current = null;
      setState("closed");
    };
  }, [enabled, onEvent, streamUrl]);

  return {
    state,
    close: () => {
      sourceRef.current?.close();
      setState("closed");
    },
  };
}
