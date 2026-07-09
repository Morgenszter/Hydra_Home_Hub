import React from "react";
import BaseComponent from "./DeviceStatus";
import { HydraDeviceComponentFx } from "../../theme/HydraComponentFx";

export type DeviceStatusFxProps = {
  fx?: HydraDeviceComponentFx;
} & Record<string, unknown>;

export function DeviceStatusFx({ fx, ...props }: DeviceStatusFxProps) {
  void fx;
  return React.createElement(BaseComponent as React.ComponentType<any>, props as any);
}

export default DeviceStatusFx;
