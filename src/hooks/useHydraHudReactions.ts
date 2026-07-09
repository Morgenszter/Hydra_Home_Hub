import { useEffect, useState } from "react";
import {
  HydraHudReaction,
  HydraHudReactionInput,
  getReactionRemainingIntensity,
  mapEventToHudReaction,
} from "../components/hud/hydraHudReactionEngine";

export function useHydraHudReactions(events: HydraHudReactionInput[]) {
  const [seen, setSeen] = useState<Record<string, true>>({});
  const [reactions, setReactions] = useState<HydraHudReaction[]>([]);

  useEffect(() => {
    const nextSeen = { ...seen };
    const nextReactions: HydraHudReaction[] = [];

    for (const event of events) {
      const id = event.eventId ?? `${event.type}:${event.timestamp}`;
      if (!nextSeen[id]) {
        nextSeen[id] = true;
        nextReactions.push(mapEventToHudReaction(event));
      }
    }

    if (nextReactions.length > 0) {
      setReactions((current) => [...current.slice(-30), ...nextReactions]);
      setSeen(nextSeen);
    }
  }, [events, seen]);

  const active = reactions.filter((reaction) => getReactionRemainingIntensity(reaction) > 0);
  const strongest = active.reduce<HydraHudReaction | null>((best, item) => {
    if (!best) return item;
    return getReactionRemainingIntensity(item) > getReactionRemainingIntensity(best) ? item : best;
  }, null);

  return {
    reactions,
    active,
    strongest,
    clear: () => setReactions([]),
  };
}
