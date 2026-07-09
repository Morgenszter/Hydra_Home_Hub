

export {};

// HYDRA_COMPAT_TELEMETRY_EXPORTS
export type TelemetrySnapshot = {
  timestamp: number;
  cpu?: number;
  ram?: number;
  battery?: number;
};

export class Telemetry {
  read(): TelemetrySnapshot {
    return { timestamp: Date.now() };
  }
}

export default Telemetry;
