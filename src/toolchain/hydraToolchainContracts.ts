export type HydraToolchainProvider =
  | "github"
  | "typescript"
  | "react_native"
  | "convex"
  | "openai"
  | "figma"
  | "airtable"
  | "ace_knowledge_graph"
  | "acumen"
  | "photoshop"
  | "canva"
  | "adobe_express"
  | "apixel"
  | "replit"
  | "lovable"
  | "base44"
  | "ai_voice_generator";

export type HydraToolchainLayer =
  | "core_dev"
  | "frontend"
  | "backend_data"
  | "ai_voice"
  | "design"
  | "rapid_build"
  | "knowledge";

export type HydraExternalSyncStatus =
  | "disabled"
  | "configured"
  | "syncing"
  | "ready"
  | "error";

export type HydraToolchainIntegration = {
  provider: HydraToolchainProvider;
  layer: HydraToolchainLayer;
  enabled: boolean;
  localFirst: boolean;
  status: HydraExternalSyncStatus;
  description: string;
};

export type HydraIntentParseRequest = {
  source: "voice" | "hud" | "tray" | "automation";
  text: string;
  locale: "pl-PL" | "en-US";
  context?: Record<string, unknown>;
};

export type HydraIntentParseResult = {
  ok: boolean;
  intent: string;
  target?: string;
  confidence: number;
  params: Record<string, unknown>;
  raw?: unknown;
  error?: string;
};

export type HydraDesignTokenExport = {
  version: string;
  theme: "green" | "blue" | "red_alert" | "night_ops";
  colors: Record<string, string>;
  spacing: Record<string, number>;
  radius: Record<string, number>;
  glow: Record<string, number>;
  typography: Record<string, string | number>;
};

export const hydraToolchainDefaults: HydraToolchainIntegration[] = [
  {
    provider: "github",
    layer: "core_dev",
    enabled: true,
    localFirst: true,
    status: "configured",
    description: "Repo, branch flow, CI, release artifacts.",
  },
  {
    provider: "typescript",
    layer: "core_dev",
    enabled: true,
    localFirst: true,
    status: "configured",
    description: "Shared contracts for Android HUD and integration adapters.",
  },
  {
    provider: "react_native",
    layer: "frontend",
    enabled: true,
    localFirst: true,
    status: "configured",
    description: "Android HUD cockpit application.",
  },
  {
    provider: "convex",
    layer: "backend_data",
    enabled: false,
    localFirst: false,
    status: "disabled",
    description: "Optional cloud/dev sync for configuration and telemetry snapshots.",
  },
  {
    provider: "airtable",
    layer: "backend_data",
    enabled: false,
    localFirst: false,
    status: "disabled",
    description: "Optional no-code device/scene configuration table.",
  },
  {
    provider: "openai",
    layer: "ai_voice",
    enabled: false,
    localFirst: false,
    status: "disabled",
    description: "Optional online intent parser fallback; local router remains primary.",
  },
  {
    provider: "figma",
    layer: "design",
    enabled: true,
    localFirst: true,
    status: "configured",
    description: "Design tokens export pipeline for HUD theme consistency.",
  },
  {
    provider: "ai_voice_generator",
    layer: "ai_voice",
    enabled: true,
    localFirst: true,
    status: "configured",
    description: "Voice personality MP3 asset generation pipeline.",
  },
];
