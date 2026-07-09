import { useEffect, useMemo, useState } from "react";
import { HydraAnimationEngine } from "../animation/HydraAnimationEngine";
import { HydraHudSignal } from "../services/hydraHudEventBridge";

export function useHydraAnimationEngine(signals: HydraHudSignal[]) {
  const engine = useMemo(() => new HydraAnimationEngine(), []);
  const [state, setState] = useState(engine.snapshot());
  const [seen, setSeen] = useState<Record<string, true>>({});

  useEffect(() => engine.onChange(setState), [engine]);

  useEffect(() => {
    const nextSeen = { ...seen };

    for (const signal of signals) {
      if (!nextSeen[signal.id]) {
        nextSeen[signal.id] = true;
        engine.enqueueFromSignal(signal);
      }
    }

    setSeen(nextSeen);
  }, [engine, seen, signals]);

  return {
    engine,
    state,
    clear: () => engine.clear(),
    completeCurrent: () => engine.completeCurrent(),
  };
}
