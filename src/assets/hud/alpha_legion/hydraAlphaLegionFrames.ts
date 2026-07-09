export type HydraHudFrameVariant =
  | "wide_top_bottom_serpents"
  | "vertical_serpent_columns"
  | "square_serpent_ui"
  | "wide_compact_ui";

export type HydraHudFrameAsset = {
  variant: HydraHudFrameVariant;
  label: string;
  role: "dashboard" | "side_panel" | "focus_card" | "control_strip";
  source: number;
  recommendedPadding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export const hydraAlphaLegionFrameAssets: Record<HydraHudFrameVariant, HydraHudFrameAsset> = {
  wide_top_bottom_serpents: {
    variant: "wide_top_bottom_serpents",
    label: "Wide Top/Bottom Serpents",
    role: "dashboard",
    source: require("./HYDRA_Frame_01_wide_top_bottom_serpents.png"),
    recommendedPadding: { top: 42, right: 24, bottom: 42, left: 24 },
  },
  vertical_serpent_columns: {
    variant: "vertical_serpent_columns",
    label: "Vertical Serpent Columns",
    role: "side_panel",
    source: require("./HYDRA_Frame_02_vertical_serpent_columns.png"),
    recommendedPadding: { top: 28, right: 36, bottom: 28, left: 36 },
  },
  square_serpent_ui: {
    variant: "square_serpent_ui",
    label: "Square Serpent UI",
    role: "focus_card",
    source: require("./HYDRA_Frame_03_square_serpent_ui.png"),
    recommendedPadding: { top: 38, right: 30, bottom: 34, left: 30 },
  },
  wide_compact_ui: {
    variant: "wide_compact_ui",
    label: "Wide Compact UI",
    role: "control_strip",
    source: require("./HYDRA_Frame_04_wide_compact_ui.png"),
    recommendedPadding: { top: 24, right: 22, bottom: 24, left: 22 },
  },
};

export const hydraAlphaLegionIcon = require("./HYDRA_Alpha_Legion_icon_01_512.png");

export function getHydraHudFrameAsset(variant: HydraHudFrameVariant) {
  return hydraAlphaLegionFrameAssets[variant];
}
