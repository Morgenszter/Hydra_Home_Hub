import { HydraEvent } from "../types/hydraProtocol";

export type HydraProtocolIntent =
  | "audio_ack"
  | "audio_completed"
  | "audio_failed"
  | "audio_offline"
  | "hud_success"
  | "hud_warning"
  | "hud_error"
  | "hud_scene_start"
  | "hud_scene_done"
  | "log_only";

export function mapHydraEventToProtocolIntents(event: HydraEvent): HydraProtocolIntent[] {
  switch (event.type) {
    case "COMMAND_ACK":
      return ["audio_ack", "log_only"];
    case "COMMAND_COMPLETED":
      return ["audio_completed", "hud_success"];
    case "COMMAND_FAILED":
      return ["audio_failed", "hud_error"];
    case "DEVICE_OFFLINE":
      return ["audio_offline", "hud_warning"];
    case "SCENE_STARTED":
      return ["hud_scene_start", "log_only"];
    case "SCENE_COMPLETED":
      return ["hud_scene_done", "audio_completed"];
    case "SCENE_FAILED":
      return ["audio_failed", "hud_error"];
    default:
      return ["log_only"];
  }
}

export function getPolishEventMessage(event: HydraEvent): string {
  if (event.message) {
    return event.message;
  }

  switch (event.type) {
    case "SYSTEM_READY":
      return "HYDRA gotowa.";
    case "COMMAND_ACK":
      return "Rozkaz przyjęty.";
    case "COMMAND_IN_PROGRESS":
      return "Wykonuję rozkaz.";
    case "COMMAND_COMPLETED":
      return "Rozkaz wykonany.";
    case "COMMAND_FAILED":
      return "Rozkaz nie został wykonany.";
    case "DEVICE_OFFLINE":
      return "Utracono kontakt z urządzeniem.";
    case "DEVICE_STATE_CHANGED":
      return "Stan urządzenia zaktualizowany.";
    case "SCENE_STARTED":
      return "Scena uruchomiona.";
    case "SCENE_COMPLETED":
      return "Scena zakończona.";
    default:
      return "Zdarzenie systemowe HYDRA.";
  }
}
