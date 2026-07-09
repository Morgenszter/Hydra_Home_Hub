import { HydraEvent } from "../../types/hydraProtocol";
import { HydraThemeMode } from "../../theme/hydraThemes";
import {
  defaultHydraHudGate,
  HydraAlertState,
  HydraCommandState,
  HydraDeviceFocus,
  HydraHudGate,
  HydraSceneState,
  HydraSessionMode,
  HydraSessionState,
} from "./hydraSessionState";
import { buildRecoveryPlan } from "./hydraRecoveryRules";

export function resolveSessionMode(event: HydraEvent, current: HydraSessionState): HydraSessionMode {
  switch (event.type) {
    case "SYSTEM_READY":
      return "IDLE";
    case "COMMAND_RECEIVED":
    case "COMMAND_ACK":
    case "COMMAND_IN_PROGRESS":
      return current.mode === "SCENE" ? "SCENE" : "COMMAND";
    case "SCENE_STARTED":
    case "SCENE_STEP_STARTED":
      return "SCENE";
    case "DEVICE_OFFLINE":
      return "OFFLINE";
    case "COMMAND_FAILED":
    case "SCENE_FAILED":
    case "SCENE_STEP_FAILED":
      return "ALERT";
    case "DEVICE_ONLINE":
      return current.mode === "OFFLINE" || current.mode === "ALERT" ? "RECOVERY" : current.mode;
    case "SCENE_COMPLETED":
      return "IDLE";
    case "COMMAND_COMPLETED":
      return current.mode === "SCENE" ? "SCENE" : "IDLE";
    default:
      return current.mode === "BOOT" ? "IDLE" : current.mode;
  }
}

export function resolveThemeMode(mode: HydraSessionMode, event: HydraEvent, current: HydraSessionState): HydraThemeMode {
  if (current.themeLocked) return current.themeMode;
  if (mode === "ALERT" || mode === "OFFLINE") return "red_alert";
  if (mode === "SCENE") return "blue";
  if (mode === "RECOVERY") return "night_ops";
  if (event.type === "SCENE_COMPLETED" || event.type === "COMMAND_COMPLETED" || mode === "IDLE") return "green";
  return current.themeMode;
}

export function resolveVoicePriority(mode: HydraSessionMode, event: HydraEvent): number {
  if (event.severity === "critical") return 100;
  if (mode === "OFFLINE") return 95;
  if (mode === "ALERT") return 90;
  if (event.type.includes("FAILED")) return 88;
  if (mode === "SCENE") return 70;
  if (mode === "RECOVERY") return 65;
  if (mode === "COMMAND") return 45;
  return 20;
}

export function resolveHudGate(mode: HydraSessionMode): HydraHudGate {
  if (mode === "OFFLINE") {
    return {
      allowCommandInput: false,
      allowSceneLaunch: false,
      showCriticalBanner: true,
      suppressLowPriorityAudio: true,
    };
  }

  if (mode === "ALERT") {
    return {
      allowCommandInput: true,
      allowSceneLaunch: false,
      showCriticalBanner: true,
      suppressLowPriorityAudio: true,
    };
  }

  if (mode === "SCENE") {
    return {
      allowCommandInput: true,
      allowSceneLaunch: false,
      showCriticalBanner: false,
      suppressLowPriorityAudio: true,
    };
  }

  if (mode === "BOOT" || mode === "SHUTDOWN") {
    return {
      allowCommandInput: false,
      allowSceneLaunch: false,
      showCriticalBanner: false,
      suppressLowPriorityAudio: true,
    };
  }

  return defaultHydraHudGate;
}

export function resolveAlertState(mode: HydraSessionMode, event: HydraEvent, current: HydraSessionState): HydraAlertState {
  if (mode === "OFFLINE") {
    return {
      active: true,
      level: "critical",
      source: event.deviceId ?? event.source,
      message: event.message || "Utracono kontakt z urządzeniem.",
      since: current.alertState.active ? current.alertState.since : Date.now(),
    };
  }

  if (mode === "ALERT") {
    return {
      active: true,
      level: event.severity === "critical" ? "critical" : "warning",
      source: event.deviceId ?? event.sceneId ?? event.source,
      message: event.message || "Alert systemowy.",
      since: current.alertState.active ? current.alertState.since : Date.now(),
    };
  }

  if (mode === "RECOVERY") {
    return {
      ...current.alertState,
      active: current.alertState.active,
      level: current.alertState.level,
    };
  }

  return {
    active: false,
    level: "none",
    source: null,
    message: null,
    since: null,
  };
}

export function resolveSceneState(event: HydraEvent, current: HydraSessionState): HydraSceneState {
  if (event.type === "SCENE_STARTED") {
    return {
      active: true,
      sceneId: event.sceneId ?? current.sceneState.sceneId ?? null,
      phase: "starting",
      startedAt: Date.now(),
      lastCompletedSceneId: current.sceneState.lastCompletedSceneId ?? null,
    };
  }

  if (event.type === "SCENE_STEP_STARTED" || event.type === "SCENE_STEP_COMPLETED") {
    return {
      ...current.sceneState,
      active: true,
      phase: "running",
      sceneId: event.sceneId ?? current.sceneState.sceneId ?? null,
    };
  }

  if (event.type === "SCENE_COMPLETED") {
    return {
      active: false,
      sceneId: null,
      phase: "completed",
      startedAt: null,
      lastCompletedSceneId: event.sceneId ?? current.sceneState.sceneId ?? null,
    };
  }

  if (event.type === "SCENE_FAILED" || event.type === "SCENE_STEP_FAILED") {
    return {
      ...current.sceneState,
      active: false,
      phase: "failed",
      sceneId: event.sceneId ?? current.sceneState.sceneId ?? null,
    };
  }

  return current.sceneState;
}

export function resolveCommandState(event: HydraEvent, current: HydraSessionState): HydraCommandState {
  if (event.type === "COMMAND_RECEIVED") {
    return {
      active: true,
      commandId: event.commandId ?? null,
      deviceId: event.deviceId ?? null,
      commandName: extractCommandName(event),
      startedAt: Date.now(),
      status: "received",
    };
  }

  if (event.type === "COMMAND_ACK") {
    return {
      ...current.commandState,
      active: true,
      commandId: event.commandId ?? current.commandState.commandId ?? null,
      deviceId: event.deviceId ?? current.commandState.deviceId ?? null,
      status: "ack",
    };
  }

  if (event.type === "COMMAND_IN_PROGRESS") {
    return {
      ...current.commandState,
      active: true,
      commandId: event.commandId ?? current.commandState.commandId ?? null,
      deviceId: event.deviceId ?? current.commandState.deviceId ?? null,
      status: "running",
    };
  }

  if (event.type === "COMMAND_COMPLETED") {
    return {
      ...current.commandState,
      active: false,
      commandId: event.commandId ?? current.commandState.commandId ?? null,
      deviceId: event.deviceId ?? current.commandState.deviceId ?? null,
      status: "completed",
    };
  }

  if (event.type === "COMMAND_FAILED") {
    return {
      ...current.commandState,
      active: false,
      commandId: event.commandId ?? current.commandState.commandId ?? null,
      deviceId: event.deviceId ?? current.commandState.deviceId ?? null,
      status: "failed",
    };
  }

  return current.commandState;
}

export function resolveDeviceFocus(event: HydraEvent, current: HydraSessionState): HydraDeviceFocus {
  const deviceId = event.deviceId ?? current.deviceFocus.primaryDeviceId ?? null;
  const now = Date.now();

  return {
    primaryDeviceId: deviceId,
    deviceType: resolveDeviceType(deviceId),
    lastOnlineAt: event.type === "DEVICE_ONLINE" ? now : current.deviceFocus.lastOnlineAt ?? null,
    lastOfflineAt: event.type === "DEVICE_OFFLINE" ? now : current.deviceFocus.lastOfflineAt ?? null,
  };
}

export function resolveRecoveryPlan(mode: HydraSessionMode, event: HydraEvent) {
  return buildRecoveryPlan(mode, event);
}

export function buildSessionMessage(mode: HydraSessionMode, event: HydraEvent): string {
  if (event.message) return event.message;

  switch (mode) {
    case "BOOT":
      return "Sekwencja startowa HYDRA.";
    case "IDLE":
      return "System HYDRA w gotowości.";
    case "COMMAND":
      return "Wykonywanie rozkazu.";
    case "SCENE":
      return "Scena operacyjna aktywna.";
    case "ALERT":
      return "Alert systemowy.";
    case "OFFLINE":
      return "Utracono kontakt z elementem systemu.";
    case "RECOVERY":
      return "Procedura odzyskiwania aktywna.";
    case "SHUTDOWN":
      return "Sekwencja wygaszania HYDRA.";
    default:
      return "Stan systemowy HYDRA.";
  }
}

function extractCommandName(event: HydraEvent): string | null {
  const payload = event.payload ?? {};
  const params = payload["params"];
  if (typeof payload["command"] === "string") return payload["command"];
  if (params && typeof params === "object" && "command" in params && typeof (params as Record<string, unknown>)["command"] === "string") {
    return (params as Record<string, unknown>)["command"] as string;
  }
  return null;
}

function resolveDeviceType(deviceId?: string | null) {
  if (!deviceId) return "unknown";
  if (deviceId.includes("lotus")) return "lotus";
  if (deviceId.includes("tapo")) return "tapo";
  if (deviceId.includes("heater")) return "heater";
  return "unknown";
}
