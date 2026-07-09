import React from "react";
import BaseComponent from "./Radar";
import { HydraRadarComponentFx } from "../../../theme/HydraComponentFx";

export type RadarFxProps = {
  fx?: HydraRadarComponentFx;
} & Record<string, unknown>;

export function RadarFx({ fx, ...props }: RadarFxProps) {
  void fx;
  return React.createElement(BaseComponent as React.ComponentType<any>, props as any);
}

export default RadarFx;
