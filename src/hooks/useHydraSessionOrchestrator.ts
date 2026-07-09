import { useEffect, useMemo, useState } from "react";
import { HydraSessionOrchestrator, HydraSessionTransition } from "../hydraModule/protocol/HydraSessionOrchestrator";
import { HydraThemeMode } from "../theme/hydraThemes";
import { HydraEvent } from "../types/hydraProtocol";

export function useHydraSessionOrchestrator(events: HydraEvent[]) {
  const orchestrator = useMemo(() => new HydraSessionOrchestrator(), []);
  const [state, setState] = useState(orchestrator.snapshot());
  const [transitions, setTransitions] = useState<HydraSessionTransition[]>([]);
  const [seen, setSeen] = useState<Record<string, true>>({});

  useEffect(() => orchestrator.onTransition((transition) => {
    setState(transition.next);
    setTransitions((current) => [...current.slice(-99), transition]);
  }), [orchestrator]);

  useEffect(() => {
    const nextSeen = { ...seen };

    for (const event of events) {
      if (!nextSeen[event.eventId]) {
        nextSeen[event.eventId] = true;
        orchestrator.ingest(event);
      }
    }

    setSeen(nextSeen);
  }, [events, orchestrator, seen]);

  return {
    orchestrator,
    state,
    transitions,
    forceMode: orchestrator.forceMode.bind(orchestrator),
    forceTheme: (mode: HydraThemeMode, locked = true) => orchestrator.forceTheme(mode, locked),
    setThemeLocked: orchestrator.setThemeLocked.bind(orchestrator),
    advanceRecoveryStep: orchestrator.advanceRecoveryStep.bind(orchestrator),
    clearHistory: orchestrator.clearHistory.bind(orchestrator),
  };
}
