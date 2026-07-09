import { useEffect, useMemo, useState } from "react";
import { HydraHudSignal } from "../services/hydraHudEventBridge";
import { HydraThemeEngine } from "../theme/HydraThemeEngine";
import { HydraThemeMode, hydraThemes } from "../theme/hydraThemes";

export function useHydraThemeEngine(signals: HydraHudSignal[]) {
  const engine = useMemo(() => new HydraThemeEngine(), []);
  const [state, setState] = useState(engine.snapshot());
  const [seen, setSeen] = useState<Record<string, true>>({});

  useEffect(() => engine.onChange(setState), [engine]);

  useEffect(() => {
    const nextSeen = { ...seen };
    for (const signal of signals) {
      if (!nextSeen[signal.id]) {
        nextSeen[signal.id] = true;
        engine.resolveFromSignal(signal);
      }
    }
    setSeen(nextSeen);
  }, [engine, seen, signals]);

  return {
    engine,
    state,
    palette: hydraThemes[state.mode],
    setMode: (mode: HydraThemeMode) => engine.setMode(mode),
    setLocked: (locked: boolean) => engine.setLocked(locked),
  };
}
