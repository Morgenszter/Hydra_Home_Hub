import { useEffect, useMemo, useState } from "react";
import { HydraProtocolEngine } from "../hydraModule/protocol/HydraProtocolEngine";
import { HydraQueuedVoiceLine } from "../services/hydraAudioEventBridge";
import { HydraHudSignal } from "../services/hydraHudEventBridge";
import { HydraEvent } from "../types/hydraProtocol";

export function useHydraProtocolEngine(events: HydraEvent[]) {
  const engine = useMemo(() => new HydraProtocolEngine(), []);
  const [hudSignals, setHudSignals] = useState<HydraHudSignal[]>([]);
  const [voiceLines, setVoiceLines] = useState<HydraQueuedVoiceLine[]>([]);
  const [lastProcessedEventId, setLastProcessedEventId] = useState<string | null>(null);

  useEffect(() => {
    engine.boot({
      onHudSignal: (signal) => {
        setHudSignals((current) => [...current.slice(-99), signal]);
      },
      onVoiceLine: (line) => {
        setVoiceLines((current) => [...current.slice(-49), line]);
      },
    });

    return () => engine.shutdown();
  }, [engine]);

  useEffect(() => {
    for (const event of events) {
      if (event.eventId === lastProcessedEventId) {
        continue;
      }
      engine.ingest(event);
      setLastProcessedEventId(event.eventId);
    }
  }, [engine, events, lastProcessedEventId]);

  return {
    engine,
    hudSignals,
    voiceLines,
    clearHudSignals: () => setHudSignals([]),
    clearVoiceLines: () => setVoiceLines([]),
    markVoiceLineCompleted: () => engine.audio.markCurrentCompleted(),
  };
}
