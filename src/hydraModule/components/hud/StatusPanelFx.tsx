import React from "react";
import BaseComponent from "./StatusPanel";
import { HydraConsoleComponentFx } from "../../../theme/HydraComponentFx";

export type StatusPanelFxProps = {
  fx?: HydraConsoleComponentFx;
} & Record<string, unknown>;

export function StatusPanelFx({ fx, ...props }: StatusPanelFxProps) {
  void fx;
  return React.createElement(BaseComponent as React.ComponentType<any>, props as any);
}

export default StatusPanelFx;
