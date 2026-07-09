import { HydraEvent } from "../types/hydraProtocol";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { HydraVoiceCategory } from "./hydraVoiceCatalog";

export function resolveVoiceCategory(event: HydraEvent, session: HydraSessionState): HydraVoiceCategory | null {
  if (event.type === "COMMAND_ACK") return "ack";
  if (event.type === "COMMAND_COMPLETED") return "command_completed";
  if (event.type === "SCENE_STARTED") return "scene_started";
  if (event.type === "SCENE_COMPLETED") return "scene_completed";
  if (event.type === "DEVICE_OFFLINE") return "offline";
  if (event.type === "DEVICE_ONLINE" || session.mode === "RECOVERY") return "recovery";
  if (event.type === "COMMAND_FAILED" || event.type === "SCENE_FAILED" || event.type === "SCENE_STEP_FAILED") return "critical";
  if (event.severity === "warning") return "warning";
  if (event.type === "SYSTEM_READY") return "info";
  return null;
}

export function resolveVoicePriority(category: HydraVoiceCategory, event: HydraEvent, session: HydraSessionState) {
  if (event.severity === "critical") return 100;
  if (category === "offline") return 96;
  if (category === "critical") return 92;
  if (session.mode === "ALERT") return 90;
  if (category === "scene_completed") return 78;
  if (category === "scene_started") return 74;
  if (category === "recovery") return 68;
  if (category === "command_completed") return 54;
  if (category === "ack") return 35;
  return 20;
}

export function isInterruptingPriority(priority: number) {
  return priority >= 90;
}
