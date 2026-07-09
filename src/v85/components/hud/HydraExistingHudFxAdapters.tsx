import React from "react";
import { HydraConsoleComponentFx, HydraDeviceComponentFx, HydraRadarComponentFx } from "../../theme/HydraComponentFx";
import { HydraPatchedConsoleLog } from "./HydraPatchedConsoleLog";
import { HydraPatchedDeviceStatus } from "./HydraPatchedDeviceStatus";
import { HydraPatchedRadar } from "./HydraPatchedRadar";

export type HydraExistingRadarFxAdapterProps = {
  fx?: HydraRadarComponentFx;
  label?: string;
};

export type HydraExistingConsoleFxAdapterProps = {
  fx?: HydraConsoleComponentFx;
  title?: string;
  message: string;
};

export type HydraExistingDeviceStatusFxAdapterProps = {
  fx?: HydraDeviceComponentFx;
  name: string;
  kind: string;
  status: string;
};

export function HydraExistingRadarFxAdapter({ fx, label }: HydraExistingRadarFxAdapterProps) {
  return <HydraPatchedRadar fx={fx} label={label ?? "RADAR"} />;
}

export function HydraExistingConsoleFxAdapter({ fx, title, message }: HydraExistingConsoleFxAdapterProps) {
  return <HydraPatchedConsoleLog fx={fx} title={title ?? "CONSOLE"} message={message} />;
}

export function HydraExistingDeviceStatusFxAdapter({ fx, name, kind, status }: HydraExistingDeviceStatusFxAdapterProps) {
  return <HydraPatchedDeviceStatus fx={fx} name={name} kind={kind} status={status} />;
}
