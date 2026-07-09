export type HydraThemeMode = "green" | "blue" | "red_alert" | "night_ops";

export type HydraThemePalette = {
  background: string;
  panel: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentSoft: string;
  warning: string;
  error: string;
  success: string;
  radar: string;
  overlay: string;
};

export const hydraThemes: Record<HydraThemeMode, HydraThemePalette> = {
  green: {
    background: "#020706",
    panel: "rgba(0,18,16,0.78)",
    border: "rgba(0,255,180,0.38)",
    textPrimary: "#eafff8",
    textSecondary: "rgba(220,255,246,0.64)",
    accent: "#8dffdc",
    accentSoft: "rgba(141,255,220,0.2)",
    warning: "#ffd166",
    error: "#ff4d6d",
    success: "#00ffaa",
    radar: "rgba(0,255,170,0.22)",
    overlay: "rgba(0,255,170,0.08)",
  },
  blue: {
    background: "#030914",
    panel: "rgba(3,10,24,0.78)",
    border: "rgba(120,190,255,0.42)",
    textPrimary: "#f1f7ff",
    textSecondary: "rgba(220,240,255,0.64)",
    accent: "#9bd0ff",
    accentSoft: "rgba(155,208,255,0.18)",
    warning: "#ffd166",
    error: "#ff6b8b",
    success: "#61e7ff",
    radar: "rgba(110,180,255,0.22)",
    overlay: "rgba(110,180,255,0.08)",
  },
  red_alert: {
    background: "#100206",
    panel: "rgba(24,3,10,0.84)",
    border: "rgba(255,80,120,0.42)",
    textPrimary: "#fff5f8",
    textSecondary: "rgba(255,230,238,0.66)",
    accent: "#ff8fab",
    accentSoft: "rgba(255,143,171,0.18)",
    warning: "#ffd166",
    error: "#ff4d6d",
    success: "#ffb3c1",
    radar: "rgba(255,77,109,0.2)",
    overlay: "rgba(255,77,109,0.12)",
  },
  night_ops: {
    background: "#01040b",
    panel: "rgba(4,8,18,0.84)",
    border: "rgba(125,140,170,0.34)",
    textPrimary: "#eef3ff",
    textSecondary: "rgba(210,220,240,0.56)",
    accent: "#a6b9d8",
    accentSoft: "rgba(166,185,216,0.14)",
    warning: "#d8c27a",
    error: "#e08aa0",
    success: "#9ad3c0",
    radar: "rgba(166,185,216,0.18)",
    overlay: "rgba(166,185,216,0.06)",
  },
};
