import { useMemo } from "react";
import { HydraVisualFXState } from "../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { bindHydraConsoleFx } from "../theme/HydraDesignBindings";
import { HydraThemePalette } from "../theme/hydraThemes";

export function useHydraConsoleFx(
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
) {
  return useMemo(() => bindHydraConsoleFx(fx, session, palette), [fx, session, palette]);
}
