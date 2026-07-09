import React from "react";
import { HydraAnimationStatusPanel as BaseComponent } from "./HydraAnimationStatusPanel";
import { HydraConsoleComponentFx } from "../../theme/HydraComponentFx";

export type HydraAnimationStatusPanelFxProps = {
  fx?: HydraConsoleComponentFx;
} & Record<string, unknown>;

export function HydraAnimationStatusPanelFx({ fx, ...props }: HydraAnimationStatusPanelFxProps) {
  void fx;
  return React.createElement(BaseComponent as React.ComponentType<any>, props as any);
}

export default HydraAnimationStatusPanelFx;
