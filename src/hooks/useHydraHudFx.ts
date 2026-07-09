import { useMemo } from "react";
import { HydraVisualFXState } from "../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { bindHydraHudFx } from "../theme/HydraDesignBindings";
import { HydraThemePalette } from "../theme/hydraThemes";

export function useHydraHudFx(
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
) {
  return useMemo(() => bindHydraHudFx(fx, session, palette), [fx, session, palette]);
}
