import { useMemo } from "react";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { bindHydraStatusFx } from "../theme/HydraDesignBindings";
import { HydraThemePalette } from "../theme/hydraThemes";

export function useHydraStatusFx(
  session: HydraSessionState,
  palette: HydraThemePalette,
) {
  return useMemo(() => bindHydraStatusFx(session, palette), [session, palette]);
}
