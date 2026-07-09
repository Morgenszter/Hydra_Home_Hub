import { HydraDesignTokenExport } from "./hydraToolchainContracts";

export const hydraFigmaTokenExportV71: HydraDesignTokenExport = {
  version: "7.1.0",
  theme: "green",
  colors: {
    background: "#020706",
    panel: "rgba(0,18,16,0.72)",
    accent: "#8dffdc",
    accentSoft: "rgba(141,255,220,0.12)",
    textPrimary: "#eafff8",
    textSecondary: "rgba(220,255,246,0.64)",
    warning: "#ffd166",
    error: "#ff416c",
    success: "#8dffdc",
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 28,
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 18,
    xl: 24,
  },
  glow: {
    idle: 0.18,
    active: 0.46,
    alert: 0.9,
    voiceWake: 0.78,
  },
  typography: {
    headingFamily: "System",
    bodyFamily: "System",
    headingWeight: "900",
    bodyWeight: "700",
    letterSpacing: 1.2,
  },
};

export function exportHydraTokensForFigma() {
  return {
    name: "HYDRA Alpha Legion HUD Tokens",
    updatedAt: new Date().toISOString(),
    tokens: hydraFigmaTokenExportV71,
  };
}
