import { HydraVisualFXState } from "../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { HydraThemePalette } from "./hydraThemes";
import { HydraDevice } from "../types/hydraProtocol";

export type HydraHudFxProps = {
  backgroundColor: string;
  panelColor: string;
  borderColor: string;
  glowLevel: number;
  alertOverlay: number;
  scanlineOpacity: number;
  themeMode: string;
  sessionMode: string;
};

export type HydraRadarFxProps = {
  sweepIntensity: number;
  sweepSpeed: number;
  radarColor: string;
  alertMode: boolean;
  ambientScan: boolean;
};

export type HydraConsoleFxProps = {
  flashLevel: number;
  textColor: string;
  borderColor: string;
  latestMessage: string;
  severity: "normal" | "warning" | "critical";
};

export type HydraDeviceTileFxProps = {
  glowLevel: number;
  statusColor: string;
  borderPulse: number;
  isFocused: boolean;
  isCritical: boolean;
  label: string;
};

export type HydraStatusFxProps = {
  label: string;
  severity: "ready" | "active" | "recovering" | "critical" | "locked";
  locked: boolean;
  color: string;
  message: string;
};

export function bindHydraHudFx(
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
): HydraHudFxProps {
  return {
    backgroundColor: palette.background,
    panelColor: palette.panel,
    borderColor: palette.border,
    glowLevel: fx.borderGlow,
    alertOverlay: fx.alertOverlay,
    scanlineOpacity: fx.scanlineLevel,
    themeMode: session.themeMode,
    sessionMode: session.mode,
  };
}

export function bindHydraRadarFx(
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
): HydraRadarFxProps {
  const alertMode = session.mode === "ALERT" || session.mode === "OFFLINE";
  const sceneMode = session.mode === "SCENE";

  return {
    sweepIntensity: Math.max(fx.radarSweep, sceneMode ? 0.85 : alertMode ? 0.65 : 0.18),
    sweepSpeed: alertMode ? 1.8 : sceneMode ? 1.25 : 0.55,
    radarColor: alertMode ? palette.error : palette.radar,
    alertMode,
    ambientScan: session.mode === "IDLE",
  };
}

export function bindHydraConsoleFx(
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
): HydraConsoleFxProps {
  const critical = session.mode === "ALERT" || session.mode === "OFFLINE";
  const warning = session.mode === "RECOVERY" || session.alertState.level === "warning";

  return {
    flashLevel: fx.consoleFlash,
    textColor: critical ? palette.error : warning ? palette.warning : palette.textPrimary,
    borderColor: critical ? palette.error : palette.border,
    latestMessage: session.lastMessage,
    severity: critical ? "critical" : warning ? "warning" : "normal",
  };
}

export function bindHydraDeviceTileFx(
  device: HydraDevice,
  fx: HydraVisualFXState,
  session: HydraSessionState,
  palette: HydraThemePalette,
): HydraDeviceTileFxProps {
  const isFocused = session.deviceFocus.primaryDeviceId === device.id;
  const isOffline = device.state.online === false;
  const isCritical = isOffline || (isFocused && session.alertState.active);
  const isHeater = device.kind === "heater" || device.id.includes("heater");

  return {
    glowLevel: isFocused ? Math.max(0.55, fx.borderGlow) : fx.borderGlow * 0.35,
    statusColor: isCritical ? palette.error : isHeater ? palette.warning : device.state.online ? palette.success : palette.textSecondary,
    borderPulse: isCritical ? Math.max(0.8, fx.alertOverlay) : isFocused ? Math.max(0.45, fx.pulseLevel) : 0,
    isFocused,
    isCritical,
    label: isCritical ? "KRYTYCZNE" : device.state.online ? "ONLINE" : "OFFLINE",
  };
}

export function bindHydraStatusFx(
  session: HydraSessionState,
  palette: HydraThemePalette,
): HydraStatusFxProps {
  if (session.mode === "OFFLINE" || session.mode === "ALERT") {
    return {
      label: session.mode === "OFFLINE" ? "OFFLINE" : "ALERT",
      severity: "critical",
      locked: session.themeLocked,
      color: palette.error,
      message: session.alertState.message ?? session.lastMessage,
    };
  }

  if (session.mode === "RECOVERY") {
    return {
      label: "RECOVERING",
      severity: "recovering",
      locked: session.themeLocked,
      color: palette.warning,
      message: session.lastMessage,
    };
  }

  if (session.mode === "SCENE" || session.mode === "COMMAND") {
    return {
      label: "ACTIVE",
      severity: "active",
      locked: session.themeLocked,
      color: palette.accent,
      message: session.lastMessage,
    };
  }

  return {
    label: "READY",
    severity: session.themeLocked ? "locked" : "ready",
    locked: session.themeLocked,
    color: palette.success,
    message: session.lastMessage,
  };
}
