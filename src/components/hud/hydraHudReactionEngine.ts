import { HydraHudFrameVariant } from "../../assets/hud/alpha_legion/hydraAlphaLegionFrames";

export type HydraHudReactionEventType =
  | "VOICE_WAKE"
  | "VOICE_COMMAND_DETECTED"
  | "COMMAND_ACK"
  | "COMMAND_COMPLETED"
  | "COMMAND_FAILED"
  | "DEVICE_OFFLINE"
  | "DEVICE_ONLINE"
  | "SCENE_STARTED"
  | "SCENE_COMPLETED"
  | "UDP_FIRE"
  | "FAST_PATH_COMPLETE"
  | "RECOVERY_STARTED"
  | "RECOVERY_COMPLETED"
  | "UNKNOWN";

export type HydraHudReaction = {
  id: string;
  eventType: HydraHudReactionEventType;
  targetFrame: "dashboard" | "focus" | "command" | "telemetry";
  frameVariant: HydraHudFrameVariant;
  intensityBoost: number;
  durationMs: number;
  label: string;
  severity: "info" | "success" | "warning" | "critical";
  createdAt: number;
};

export type HydraHudReactionInput = {
  type?: string;
  eventId?: string;
  message?: string;
  timestamp?: number;
};

export function mapEventToHudReaction(event: HydraHudReactionInput): HydraHudReaction {
  const now = Date.now();
  const type = normalizeEventType(event.type);
  const id = event.eventId ?? `${type}:${now}`;

  switch (type) {
    case "VOICE_WAKE":
      return build(id, type, "focus", "square_serpent_ui", 0.9, 900, "OMEGON DETECTED", "success", now);
    case "VOICE_COMMAND_DETECTED":
      return build(id, type, "command", "wide_compact_ui", 0.74, 800, "VOICE COMMAND ROUTED", "info", now);
    case "COMMAND_ACK":
      return build(id, type, "command", "wide_compact_ui", 0.58, 650, "COMMAND ACK", "success", now);
    case "COMMAND_COMPLETED":
      return build(id, type, "command", "wide_compact_ui", 0.48, 700, "COMMAND COMPLETE", "success", now);
    case "COMMAND_FAILED":
      return build(id, type, "command", "square_serpent_ui", 0.88, 1200, "COMMAND FAILED", "critical", now);
    case "DEVICE_OFFLINE":
      return build(id, type, "telemetry", "vertical_serpent_columns", 1, 1600, "DEVICE OFFLINE", "critical", now);
    case "DEVICE_ONLINE":
      return build(id, type, "telemetry", "vertical_serpent_columns", 0.5, 900, "DEVICE ONLINE", "success", now);
    case "SCENE_STARTED":
      return build(id, type, "dashboard", "wide_top_bottom_serpents", 0.76, 1200, "SCENE STARTED", "info", now);
    case "SCENE_COMPLETED":
      return build(id, type, "dashboard", "wide_top_bottom_serpents", 0.44, 900, "SCENE COMPLETE", "success", now);
    case "UDP_FIRE":
      return build(id, type, "command", "wide_compact_ui", 0.96, 550, "UDP FAST PATH", "warning", now);
    case "FAST_PATH_COMPLETE":
      return build(id, type, "command", "wide_compact_ui", 0.5, 700, "FAST PATH COMPLETE", "success", now);
    case "RECOVERY_STARTED":
      return build(id, type, "telemetry", "vertical_serpent_columns", 0.7, 1200, "RECOVERY STARTED", "warning", now);
    case "RECOVERY_COMPLETED":
      return build(id, type, "telemetry", "vertical_serpent_columns", 0.46, 900, "RECOVERY COMPLETE", "success", now);
    default:
      return build(id, "UNKNOWN", "dashboard", "wide_compact_ui", 0.25, 500, "SYSTEM EVENT", "info", now);
  }
}

export function getReactionRemainingIntensity(reaction: HydraHudReaction, now = Date.now()) {
  const age = now - reaction.createdAt;
  if (age >= reaction.durationMs) return 0;
  return reaction.intensityBoost * (1 - age / reaction.durationMs);
}

function build(
  id: string,
  eventType: HydraHudReactionEventType,
  targetFrame: HydraHudReaction["targetFrame"],
  frameVariant: HydraHudFrameVariant,
  intensityBoost: number,
  durationMs: number,
  label: string,
  severity: HydraHudReaction["severity"],
  createdAt: number,
): HydraHudReaction {
  return { id, eventType, targetFrame, frameVariant, intensityBoost, durationMs, label, severity, createdAt };
}

function normalizeEventType(type?: string): HydraHudReactionEventType {
  const raw = String(type ?? "UNKNOWN").toUpperCase();
  if (raw.includes("VOICE_WAKE") || raw.includes("OMEGON")) return "VOICE_WAKE";
  if (raw.includes("VOICE_COMMAND")) return "VOICE_COMMAND_DETECTED";
  if (raw.includes("COMMAND_ACK")) return "COMMAND_ACK";
  if (raw.includes("COMMAND_COMPLETED")) return "COMMAND_COMPLETED";
  if (raw.includes("COMMAND_FAILED")) return "COMMAND_FAILED";
  if (raw.includes("DEVICE_OFFLINE")) return "DEVICE_OFFLINE";
  if (raw.includes("DEVICE_ONLINE")) return "DEVICE_ONLINE";
  if (raw.includes("SCENE_STARTED")) return "SCENE_STARTED";
  if (raw.includes("SCENE_COMPLETED")) return "SCENE_COMPLETED";
  if (raw.includes("UDP_FIRE")) return "UDP_FIRE";
  if (raw.includes("FAST_PATH_COMPLETE")) return "FAST_PATH_COMPLETE";
  if (raw.includes("RECOVERY_STARTED")) return "RECOVERY_STARTED";
  if (raw.includes("RECOVERY_COMPLETED")) return "RECOVERY_COMPLETED";
  return "UNKNOWN";
}
