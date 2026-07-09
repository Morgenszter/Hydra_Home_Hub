import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { hydraAlphaLegionIcon } from "../../assets/hud/alpha_legion/hydraAlphaLegionFrames";
import { HydraThemePalette } from "../../theme/hydraThemes";

export type HydraAlphaLegionBadgeProps = {
  palette?: HydraThemePalette;
  size?: number;
  title?: string;
  subtitle?: string;
};

export function HydraAlphaLegionBadge({
  palette,
  size = 74,
  title = "HYDRA",
  subtitle = "ALPHA LEGION",
}: HydraAlphaLegionBadgeProps) {
  return (
    <View style={styles.row}>
      <Image
        source={hydraAlphaLegionIcon}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      <View style={styles.textBlock}>
        <Text style={[styles.title, { color: palette?.textPrimary ?? "#eafff8" }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: palette?.accent ?? "#8dffdc" }]}>{subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textBlock: {
    gap: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2.4,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.8,
  },
});
