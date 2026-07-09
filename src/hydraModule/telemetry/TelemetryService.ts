export type HydraTelemetrySnapshot = {
  cpu?: number;
  ram?: number;
  battery?: number;
  network?: "online" | "offline" | "unknown";
  timestamp: number;
};

export class TelemetryService {
  private lastSnapshot: HydraTelemetrySnapshot = {
    network: "unknown",
    timestamp: Date.now(),
  };

  getSnapshot(): HydraTelemetrySnapshot {
    return this.lastSnapshot;
  }

  update(snapshot: Partial<HydraTelemetrySnapshot>) {
    this.lastSnapshot = {
      ...this.lastSnapshot,
      ...snapshot,
      timestamp: Date.now(),
    };
    return this.lastSnapshot;
  }
}
