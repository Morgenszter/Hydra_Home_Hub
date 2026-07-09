import { useEffect, useMemo, useState } from "react";
import { HydraQueuedVoiceLine } from "../services/hydraAudioEventBridge";
import { HydraAudioQueueEngine } from "../audio/HydraAudioQueueEngine";

export function useHydraAudioQueueEngine(voiceLines: HydraQueuedVoiceLine[]) {
  const engine = useMemo(() => new HydraAudioQueueEngine(), []);
  const [state, setState] = useState(engine.snapshot());
  const [seen, setSeen] = useState<Record<string, true>>({});

  useEffect(() => engine.onChange(setState), [engine]);

  useEffect(() => {
    const nextSeen = { ...seen };
    for (const line of voiceLines) {
      if (!nextSeen[line.id]) {
        nextSeen[line.id] = true;
        engine.enqueue(line);
      }
    }
    setSeen(nextSeen);
  }, [engine, seen, voiceLines]);

  return {
    engine,
    state,
    setMuted: (muted: boolean) => engine.setMuted(muted),
    setVolume: (volume: number) => engine.setVolume(volume),
    clear: () => engine.clear(),
    completeCurrent: () => engine.completeCurrent(),
  };
}
