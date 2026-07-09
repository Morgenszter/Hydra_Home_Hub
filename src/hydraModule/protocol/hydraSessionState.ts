import { HydraThemeMode } from "../../theme/hydraThemes";

export type HydraSessionMode =
  | "BOOT"
  | "IDLE"
  | "COMMAND"
  | "SCENE"
  | "ALERT"
  | "OFFLINE"
  | "RECOVERY"
  | "SHUTDOWN";

export type HydraAlertLevel = "none" | "warning" | "critical";

export type HydraAlertState = {
  active: boolean;
  level: HydraAlertLevel;
  source?: string | null;
  message?: string | null;
  since?: number | null;
};

export type HydraScenePhase = "starting" | "running" | "completed" | "failed" | null;

export type HydraSceneState = {
  active: boolean;
  sceneId?: string | null;
  phase?: HydraScenePhase;
  startedAt?: number | null;
  lastCompletedSceneId?: string | null;
};

export type HydraDeviceType = "lotus" | "tapo" | "heater" | "unknown";

export type HydraDeviceFocus = {
  primaryDeviceId?: string | null;
  deviceType: HydraDeviceType;
  lastOnlineAt?: number | null;
  lastOfflineAt?: number | null;
};

export type HydraCommandStatus =
  | "received"
  | "ack"
  | "running"
  | "completed"
  | "failed"
  | null;

export type HydraCommandState = {
  active: boolean;
  commandId?: string | null;
  deviceId?: string | null;
  commandName?: string | null;
  startedAt?: number | null;
  status?: HydraCommandStatus;
};

export type HydraHudGate = {
  allowCommandInput: boolean;
  allowSceneLaunch: boolean;
  showCriticalBanner: boolean;
  suppressLowPriorityAudio: boolean;
};

export type HydraRecoveryStep =
  | "ping_bridge"
  | "refresh_registry"
  | "probe_device"
  | "retry_command"
  | "notify_operator"
  | "cooldown";

export type HydraRecoveryPlan = {
  active: boolean;
  reason: string;
  steps: HydraRecoveryStep[];
  currentStepIndex: number;
  startedAt: number | null;
  retryBudget: number;
};

export type HydraSessionState = {
  mode: HydraSessionMode;
  previousMode: HydraSessionMode | null;
  themeMode: HydraThemeMode;
  themeLocked: boolean;
  voicePriority: number;
  hudGate: HydraHudGate;
  recoveryPlan: HydraRecoveryPlan;
  alertState: HydraAlertState;
  sceneState: HydraSceneState;
  commandState: HydraCommandState;
  deviceFocus: HydraDeviceFocus;
  activeCommandId?: string | null;
  activeDeviceId?: string | null;
  activeSceneId?: string | null;
  lastMessage: string;
  updatedAt: number;
};

export const defaultHydraHudGate: HydraHudGate = {
  allowCommandInput: true,
  allowSceneLaunch: true,
  showCriticalBanner: false,
  suppressLowPriorityAudio: false,
};

export const inactiveRecoveryPlan: HydraRecoveryPlan = {
  active: false,
  reason: "none",
  steps: [],
  currentStepIndex: 0,
  startedAt: null,
  retryBudget: 0,
};

export const initialHydraSessionState: HydraSessionState = {
  mode: "BOOT",
  previousMode: null,
  themeMode: "green",
  themeLocked: false,
  voicePriority: 0,
  hudGate: defaultHydraHudGate,
  recoveryPlan: inactiveRecoveryPlan,
  alertState: {
    active: false,
    level: "none",
    source: null,
    message: null,
    since: null,
  },
  sceneState: {
    active: false,
    sceneId: null,
    phase: null,
    startedAt: null,
    lastCompletedSceneId: null,
  },
  commandState: {
    active: false,
    commandId: null,
    deviceId: null,
    commandName: null,
    startedAt: null,
    status: null,
  },
  deviceFocus: {
    primaryDeviceId: null,
    deviceType: "unknown",
    lastOnlineAt: null,
    lastOfflineAt: null,
  },
  activeCommandId: null,
  activeDeviceId: null,
  activeSceneId: null,
  lastMessage: "HYDRA boot sequence.",
  updatedAt: Date.now(),
};
