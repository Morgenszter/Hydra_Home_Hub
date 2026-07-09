export interface HydraStatus {
  online: boolean;
  initialized: boolean;
  version: string;
}

export interface AIState {
  active: boolean;
  model: string;
  thinking: boolean;
}

export interface BLEState {
  enabled: boolean;
  scanning: boolean;
  connected: boolean;
  devices: number;
}

export interface AudioState {
  enabled: boolean;
  playing: boolean;
  muted: boolean;
  volume: number;
}

export interface NetworkState {
  connected: boolean;
  wifi: boolean;
  internet: boolean;
  ip: string;
}

export interface ThermalState {
  cpu: number;
  battery: number;
}

export interface Target {
  id: string;
  name: string;
  distance: number;
  strength: number;
}

export interface ConsoleEntry {
  id: string;
  level: "info" | "warn" | "error";
  message: string;
  timestamp: number;
}

export interface HydraState {
  status: HydraStatus;
  ai: AIState;
  ble: BLEState;
  audio: AudioState;
  network: NetworkState;
  thermal: ThermalState;
  logs: ConsoleEntry[];
  targets: Target[];
  selectedTarget?: Target;
}
