export type HydraModuleManifest = {
  version: string;
  status: "integrated" | "standalone";
  modules: string[];
};

export const hydraModuleManifest: HydraModuleManifest = {
  version: "3.2.0",
  status: "integrated",
  modules: [
    "core",
    "store",
    "ui",
    "telemetry",
    "audio",
    "ble",
    "network",
    "vision",
    "radar",
    "ai",
    "automation",
  ],
};
