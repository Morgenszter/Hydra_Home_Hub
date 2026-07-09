import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraHudFrameVariant } from "../../assets/hud/alpha_legion/hydraAlphaLegionFrames";
import { HydraThemePalette } from "../../theme/hydraThemes";
import { HydraHudFrame } from "./HydraHudFrame";

const VARIANTS: HydraHudFrameVariant[] = [
  "wide_top_bottom_serpents",
  "vertical_serpent_columns",
  "square_serpent_ui",
  "wide_compact_ui",
];

export type HydraFrameShowcasePanelProps = {
  palette: HydraThemePalette;
};

export function HydraFrameShowcasePanel({ palette }: HydraFrameShowcasePanelProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: palette.accent }]}>ALPHA LEGION HUD FRAMES</Text>
      {VARIANTS.map((variant) => (
        <HydraHudFrame key={variant} variant={variant} palette={palette} intensity={0.52} contentStyle={styles.frameContent}>
          <Text style={[styles.variant, { color: palette.textPrimary }]}>{variant.toUpperCase()}</Text>
          <Text style={[styles.meta, { color: palette.textSecondary }]}>2.5D transparent PNG overlay active</Text>
        </HydraHudFrame>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  frameContent: {
    minHeight: 88,
    justifyContent: "center",
    gap: 4,
  },
  variant: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  meta: {
    fontSize: 10,
    fontWeight: "700",
  },
});
