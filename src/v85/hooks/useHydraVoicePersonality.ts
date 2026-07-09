import { useEffect, useMemo, useState } from "react";
import { HydraVoiceIntent, HydraVoicePersonalityEngine } from "../audio/HydraVoicePersonalityEngine";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { HydraQueuedVoiceLine } from "../services/hydraAudioEventBridge";
import { HydraEvent } from "../types/hydraProtocol";

export function useHydraVoicePersonality(events: HydraEvent[], sessionState: HydraSessionState) {
  const engine = useMemo(() => new HydraVoicePersonalityEngine(), []);
  const [seen, setSeen] = useState<Record<string, true>>({});
  const [intents, setIntents] = useState<HydraVoiceIntent[]>([]);
  const [voiceLines, setVoiceLines] = useState<HydraQueuedVoiceLine[]>([]);

  useEffect(() => {
    const nextSeen = { ...seen };

    for (const event of events) {
      if (nextSeen[event.eventId]) continue;
      nextSeen[event.eventId] = true;

      const decision = engine.resolve(event, sessionState);
      if (decision.accepted) {
        setIntents((current) => [...current.slice(-99), decision.intent]);
        setVoiceLines((current) => {
          if (decision.interruptCurrent) {
            return [decision.line, ...current.slice(-49)];
          }
          return [...current.slice(-49), decision.line];
        });
      }
    }

    setSeen(nextSeen);
  }, [engine, events, seen, sessionState]);

  return {
    engine,
    intents,
    voiceLines,
    clear: () => {
      setIntents([]);
      setVoiceLines([]);
      engine.resetCooldowns();
    },
  };
}
