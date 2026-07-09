export type HydraRadarComponentFx = {
  sweepIntensity?: number;
  sweepSpeed?: number;
  radarColor?: string;
  alertMode?: boolean;
};

export type HydraConsoleComponentFx = {
  flashLevel?: number;
  textColor?: string;
  borderColor?: string;
  severity?: "normal" | "warning" | "critical";
};

export type HydraDeviceComponentFx = {
  glowLevel?: number;
  statusColor?: string;
  borderPulse?: number;
  isFocused?: boolean;
  isCritical?: boolean;
};
