import React from "react";
import BaseComponent from "./ConsoleLog";
import { HydraConsoleComponentFx } from "../../theme/HydraComponentFx";

export type ConsoleLogFxProps = {
  fx?: HydraConsoleComponentFx;
} & Record<string, unknown>;

export function ConsoleLogFx({ fx, ...props }: ConsoleLogFxProps) {
  void fx;
  return React.createElement(BaseComponent as React.ComponentType<any>, props as any);
}

export default ConsoleLogFx;
