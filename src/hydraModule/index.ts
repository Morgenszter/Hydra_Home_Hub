export type { HydraModuleManifest } from "./moduleManifest";

export const HYDRA_MODULE_VERSION = "3.2.0";

export const HYDRA_MODULE_STRUCTURE = [
  "ai",
  "audio",
  "automation",
  "ble",
  "components",
  "config",
  "core",
  "hooks",
  "network",
  "plugins",
  "radar",
  "services",
  "store",
  "telemetry",
  "theme",
  "types",
  "utils",
  "vision",
] as const;
export * from "./protocol";

export * from "../audio/HydraAudioQueueEngine";
export * from "../audio/hydraVoiceManifest";
