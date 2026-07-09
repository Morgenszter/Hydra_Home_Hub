import React, { ReactNode } from "react";
import { Image, ImageResizeMode, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  getHydraHudFrameAsset,
  HydraHudFrameVariant,
} from "../../assets/hud/alpha_legion/hydraAlphaLegionFrames";
import { HydraThemePalette } from "../../theme/hydraThemes";

export type HydraHudFrameProps = {
  variant?: HydraHudFrameVariant;
  palette?: HydraThemePalette;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
  intensity?: number;
  disabled?: boolean;
};

export function HydraHudFrame({
  variant = "wide_compact_ui",
  palette,
  children,
  style,
  contentStyle,
  imageStyle,
  resizeMode = "stretch",
  intensity = 0.7,
  disabled = false,
}: HydraHudFrameProps) {
  const asset = getHydraHudFrameAsset(variant);
  const safeIntensity = Math.max(0, Math.min(1, intensity));

  if (disabled) {
    return <View style={style}>{children}</View>;
  }

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderColor: palette?.border ?? "rgba(141,255,220,0.22)",
          shadowColor: palette?.accent ?? "#8dffdc",
          shadowOpacity: 0.2 + safeIntensity * 0.22,
        },
        style,
      ]}
    >
      <Image
        source={asset.source}
        resizeMode={resizeMode}
        style={[
          styles.frameImage,
          {
            opacity: 0.62 + safeIntensity * 0.28,
          },
          imageStyle,
        ]}
        pointerEvents="none"
      />

      <View
        style={[
          styles.innerGlow,
          {
            borderColor: palette?.accentSoft ?? "rgba(141,255,220,0.12)",
            backgroundColor: palette?.overlay ?? "rgba(0,255,170,0.05)",
            opacity: 0.42 + safeIntensity * 0.3,
          },
        ]}
        pointerEvents="none"
      />

      <View
        style={[
          styles.content,
          {
            paddingTop: asset.recommendedPadding.top,
            paddingRight: asset.recommendedPadding.right,
            paddingBottom: asset.recommendedPadding.bottom,
            paddingLeft: asset.recommendedPadding.left,
          },
          contentStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
    borderWidth: 1,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(0,0,0,0.16)",
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  frameImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  innerGlow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderRadius: 20,
  },
  content: {
    position: "relative",
    zIndex: 2,
  },
});
