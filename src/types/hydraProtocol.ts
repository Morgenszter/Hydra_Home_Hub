export type HydraSeverity = "debug" | "info" | "warning" | "error" | "critical";

export type HydraEventType =
  | "SYSTEM_READY"
  | "DEVICE_REGISTERED"
  | "DEVICE_DISCOVERED"
  | "DEVICE_ONLINE"
  | "DEVICE_OFFLINE"
  | "DEVICE_STATE_CHANGED"
  | "COMMAND_RECEIVED"
  | "COMMAND_ACK"
  | "COMMAND_IN_PROGRESS"
  | "COMMAND_COMPLETED"
  | "COMMAND_FAILED"
  | "SCENE_STARTED"
  | "SCENE_STEP_STARTED"
  | "SCENE_STEP_COMPLETED"
  | "SCENE_STEP_FAILED"
  | "SCENE_COMPLETED"
  | "SCENE_FAILED";

export type HydraEvent = {
  eventId: string;
  type: HydraEventType | string;
  timestamp: number;
  source: string;
  severity: HydraSeverity;
  message: string;
  commandId?: string | null;
  deviceId?: string | null;
  sceneId?: string | null;
  payload?: Record<string, unknown>;
};

export type HydraCapabilities = {
  power: boolean;
  brightness: boolean;
  color: boolean;
  temperature: boolean;
  modes: string[];
};

export type HydraDeviceState = {
  online: boolean;
  power: boolean;
  brightness?: number | null;
  color?: string | null;
  temperature?: number | null;
  targetTemperature?: number | null;
  mode?: string | null;
  lastError?: string | null;
};

export type HydraDevice = {
  id: string;
  name: string;
  kind: "light" | "heater" | string;
  protocol: "ble" | "wifi" | string;
  room: string;
  capabilities: HydraCapabilities;
  state: HydraDeviceState;
  metadata?: Record<string, unknown>;
};

export type HydraCommandRequest = {
  command: string;
  params?: Record<string, unknown>;
};

export type HydraCommandRecord = {
  commandId: string;
  deviceId?: string | null;
  sceneId?: string | null;
  command: string;
  status: "RECEIVED" | "IN_PROGRESS" | "COMPLETED" | "FAILED" | string;
  createdAt: number;
  updatedAt: number;
  params: Record<string, unknown>;
  result?: Record<string, unknown> | null;
  error?: string | null;
};

export type HydraSceneStep = {
  deviceId: string;
  command: string;
  params?: Record<string, unknown>;
};

export type HydraScene = {
  id: string;
  name: string;
  mode: "sequential" | "parallel" | string;
  steps: HydraSceneStep[];
};

export type HydraStatus = {
  ok: boolean;
  devices: HydraDevice[];
  events: HydraEvent[];
};
