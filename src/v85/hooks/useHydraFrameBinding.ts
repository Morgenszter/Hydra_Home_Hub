import { useMemo } from "react";
import { useWindowDimensions } from "react-native";
import { HydraVisualFXState } from "../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import {
  HydraFrameBindingDecision,
  resolveHydraFrameBinding,
} from "../components/hud/hydraFrameBindingEngine";

export function useHydraFrameBinding(
  session: HydraSessionState,
  visualFx: HydraVisualFXState,
  focusedDeviceId?: string | null
): HydraFrameBindingDecision {
  const { width, height } = useWindowDimensions();

  return useMemo(
    () =>
      resolveHydraFrameBinding({
        session,
        visualFx,
        viewportWidth: width,
        viewportHeight: height,
        focusedDeviceId,
      }),
    [session, visualFx, width, height, focusedDeviceId]
  );
}
