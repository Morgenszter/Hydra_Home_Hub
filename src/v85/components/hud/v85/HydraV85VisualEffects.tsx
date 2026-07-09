import React, { useEffect, useMemo, useRef } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";

export type HydraV85VisualEffectsProps = {
  glow: number;
  alert?: boolean;
};

const DATA_STREAMS = [
  "0101", "ALPHA", "XX", "SERPENTIS", "HYDRA", "NOOS", "LOCK", "LUX", "WIFI", "TEMP",
  "CORE", "SCAN", "AUX", "OMEGON", "MATRIX", "SIGIL", "NODE", "VAULT",
];

export function HydraV85VisualEffects({ glow, alert = false }: HydraV85VisualEffectsProps) {
  const phase = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(phase, {
        toValue: 1,
        duration: alert ? 1450 : 3200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();
    return () => loop.stop();
  }, [alert, phase]);

  const sweepX = phase.interpolate({
    inputRange: [0, 1],
    outputRange: [-360, 360],
  });

  const shimmerOpacity = phase.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.12, 0.42, 0.12],
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <View style={styles.vignette} />
      <Animated.View
        style={[
          styles.horizontalSweep,
          {
            opacity: shimmerOpacity,
            transform: [{ translateX: sweepX }],
          },
        ]}
      />
      <DataRainLayer glow={glow} />
      <ScanlineLayer glow={glow} alert={alert} />
      <CornerGlyphs glow={glow} />
    </View>
  );
}

function DataRainLayer({ glow }: { glow: number }) {
  const streams = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: `stream-${index}`,
        left: `${3 + ((index * 37) % 94)}%`,
        top: `${4 + ((index * 23) % 82)}%`,
        opacity: 0.08 + ((index % 5) * 0.03) + glow * 0.04,
        text: DATA_STREAMS[index % DATA_STREAMS.length],
      })),
    [glow],
  );

  return (
    <View style={StyleSheet.absoluteFill}>
      {streams.map((stream) => (
        <Text
          key={stream.id}
          style={[
            styles.dataGlyph,
            {
              left: stream.left,
              top: stream.top,
              opacity: stream.opacity,
            },
          ]}
        >
          {stream.text}
        </Text>
      ))}
    </View>
  );
}

function ScanlineLayer({ glow, alert }: { glow: number; alert: boolean }) {
  const lines = useMemo(() => Array.from({ length: 18 }, (_, index) => index), []);
  return (
    <View style={StyleSheet.absoluteFill}>
      {lines.map((line) => (
        <View
          key={line}
          style={[
            styles.scanline,
            {
              top: `${line * 5.8}%`,
              opacity: (alert ? 0.12 : 0.055) + glow * 0.018,
            },
          ]}
        />
      ))}
    </View>
  );
}

function CornerGlyphs({ glow }: { glow: number }) {
  return (
    <>
      <View style={[styles.corner, styles.cornerTopLeft, { opacity: 0.32 + glow * 0.22 }]} />
      <View style={[styles.corner, styles.cornerTopRight, { opacity: 0.32 + glow * 0.22 }]} />
      <View style={[styles.corner, styles.cornerBottomLeft, { opacity: 0.32 + glow * 0.22 }]} />
      <View style={[styles.corner, styles.cornerBottomRight, { opacity: 0.32 + glow * 0.22 }]} />
    </>
  );
}

export function HydraV85GlowText({ children, glow, style }: { children: React.ReactNode; glow: number; style?: any }) {
  return (
    <Text
      style={[
        styles.glowText,
        {
          textShadowRadius: 7 + glow * 16,
          opacity: 0.82 + glow * 0.18,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.26)",
    borderColor: "rgba(0,255,213,0.06)",
    borderWidth: 1,
  },
  horizontalSweep: {
    position: "absolute",
    top: "8%",
    bottom: "8%",
    width: 130,
    backgroundColor: "rgba(0,255,213,0.08)",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(141,255,220,0.42)",
  },
  dataGlyph: {
    position: "absolute",
    color: "#8dffdc",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  scanline: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(141,255,220,0.42)",
  },
  corner: {
    position: "absolute",
    width: 74,
    height: 74,
    borderColor: "rgba(141,255,220,0.42)",
  },
  cornerTopLeft: {
    left: 10,
    top: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
  },
  cornerTopRight: {
    right: 10,
    top: 10,
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  cornerBottomLeft: {
    left: 10,
    bottom: 10,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  },
  cornerBottomRight: {
    right: 10,
    bottom: 10,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  glowText: {
    color: "#8dffdc",
    textShadowColor: "rgba(0,255,213,0.82)",
  },
});
