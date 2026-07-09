import { HydraVisualFXState } from "../../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../../hydraModule/protocol/hydraSessionState";
import { HydraHudFrameVariant } from "../../assets/hud/alpha_legion/hydraAlphaLegionFrames";

export type HydraFrameBindingContext = {
  session: HydraSessionState;
  visualFx: HydraVisualFXState;
  viewportWidth?: number;
  viewportHeight?: number;
  focusedDeviceId?: string | null;
};

export type HydraFrameBindingDecision = {
  dashboardVariant: HydraHudFrameVariant;
  focusVariant: HydraHudFrameVariant;
  commandVariant: HydraHudFrameVariant;
  telemetryVariant: HydraHudFrameVariant;
  dashboardIntensity: number;
  focusIntensity: number;
  commandIntensity: number;
  telemetryIntensity: number;
  compactMode: boolean;
  reason: string[];
};

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

export function resolveHydraFrameBinding(
  context: HydraFrameBindingContext
): HydraFrameBindingDecision {
  const { session, visualFx, viewportWidth = 430, viewportHeight = 900, focusedDeviceId } = context;

  const compactMode = viewportWidth < 420 || viewportHeight < 760;
  const landscape = viewportWidth > viewportHeight;
  const redAlert = session.alertState.active || session.alertState.level === "critical";
  const voiceMode =
    session.mode === "voice" ||
    session.mode === "listening" ||
    session.commandState.status === "listening" ||
    session.commandState.status === "awaiting";
  const sceneActive = !!session.sceneState.phase && session.sceneState.phase !== "idle";
  const deviceFocus = !!focusedDeviceId;

  const reason: string[] = [];

  let dashboardVariant: HydraHudFrameVariant = compactMode
    ? "wide_compact_ui"
    : "wide_top_bottom_serpents";
  let telemetryVariant: HydraHudFrameVariant = landscape
    ? "vertical_serpent_columns"
    : "wide_compact_ui";
  let focusVariant: HydraHudFrameVariant = "square_serpent_ui";
  let commandVariant: HydraHudFrameVariant = compactMode
    ? "wide_compact_ui"
    : "square_serpent_ui";

  if (redAlert) {
    reason.push("red_alert");
    dashboardVariant = "wide_top_bottom_serpents";
    focusVariant = "square_serpent_ui";
    commandVariant = "square_serpent_ui";
  }

  if (voiceMode) {
    reason.push("voice_mode");
    focusVariant = "square_serpent_ui";
    commandVariant = compactMode ? "wide_compact_ui" : "square_serpent_ui";
  }

  if (sceneActive) {
    reason.push("scene_active");
    dashboardVariant = "wide_top_bottom_serpents";
  }

  if (deviceFocus) {
    reason.push("device_focus");
    telemetryVariant = "vertical_serpent_columns";
  }

  if (compactMode) {
    reason.push("compact_mode");
  }

  if (landscape) {
    reason.push("landscape");
  }

  const base = clamp01(0.38 + visualFx.borderGlow * 0.42 + visualFx.pulseLevel * 0.2);
  const dashboardIntensity = clamp01(base + (redAlert ? 0.25 : 0.05) + (sceneActive ? 0.12 : 0));
  const focusIntensity = clamp01(base + (voiceMode ? 0.3 : 0.08) + (redAlert ? 0.14 : 0));
  const commandIntensity = clamp01(base + (session.commandState.status !== "idle" ? 0.2 : 0.04));
  const telemetryIntensity = clamp01(base + (deviceFocus ? 0.16 : 0.02));

  return {
    dashboardVariant,
    focusVariant,
    commandVariant,
    telemetryVariant,
    dashboardIntensity,
    focusIntensity,
    commandIntensity,
    telemetryIntensity,
    compactMode,
    reason,
  };
}
