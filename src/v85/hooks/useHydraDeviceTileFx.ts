import { useMemo } from "react";
import { HydraVisualFXState } from "../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { bindHydraDeviceTileFx } from "../theme/HydraDesignBindings";
import { HydraThemePalette } from "../theme/hydraThemes";
import { HydraDevice } from "../types/hydraProtocol";

export function useHydraDeviceTileFx(
  device: HydraDevice,
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
) {
  return useMemo(() => bindHydraDeviceTileFx(device, fx, session, palette), [device, fx, session, palette]);
}
