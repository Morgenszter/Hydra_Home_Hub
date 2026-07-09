import { useMemo } from "react";
import { HydraVisualFXState } from "../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { bindHydraRadarFx } from "../theme/HydraDesignBindings";
import { HydraThemePalette } from "../theme/hydraThemes";

export function useHydraRadarFx(
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
) {
  return useMemo(() => bindHydraRadarFx(fx, session, palette), [fx, session, palette]);
}
