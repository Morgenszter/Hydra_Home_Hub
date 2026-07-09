import { useEffect, useMemo, useState } from "react";
import { HydraAnimationCommand } from "../animation/hydraAnimationTypes";
import { HydraVisualFXBridge } from "../animation/HydraVisualFXBridge";
import { HydraThemeMode } from "../theme/hydraThemes";

export function useHydraVisualFX(currentAnimation: HydraAnimationCommand | null, themeMode: HydraThemeMode) {
  const bridge = useMemo(() => new HydraVisualFXBridge(), []);
  const [state, setState] = useState(bridge.snapshot());

  useEffect(() => bridge.onChange(setState), [bridge]);

  useEffect(() => {
    bridge.setThemeMode(themeMode);
  }, [bridge, themeMode]);

  useEffect(() => {
    bridge.applyAnimation(currentAnimation);
  }, [bridge, currentAnimation]);

  return {
    bridge,
    state,
  };
}
