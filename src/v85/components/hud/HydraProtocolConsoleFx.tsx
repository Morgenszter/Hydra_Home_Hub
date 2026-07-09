import React from "react";
import { HydraProtocolConsole as BaseComponent } from "./HydraProtocolConsole";
import { HydraConsoleComponentFx } from "../../theme/HydraComponentFx";

export type HydraProtocolConsoleFxProps = {
  fx?: HydraConsoleComponentFx;
} & Record<string, unknown>;

export function HydraProtocolConsoleFx({ fx, ...props }: HydraProtocolConsoleFxProps) {
  void fx;
  return React.createElement(BaseComponent as React.ComponentType<any>, props as any);
}

export default HydraProtocolConsoleFx;
