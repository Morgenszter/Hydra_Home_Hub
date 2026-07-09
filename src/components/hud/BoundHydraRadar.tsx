import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraRadarFxProps } from "../../theme/HydraDesignBindings";

export type BoundHydraRadarProps = {
  fx: HydraRadarFxProps;
};

export function BoundHydraRadar({ fx }: BoundHydraRadarProps) {
  const size = Math.round(46 + fx.sweepIntensity * 54);

  return (
    <View style={[styles.panel, { borderColor: fx.radarColor }]}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: fx.radarColor }]}>RADAR FX</Text>
        <Text style={styles.mode}>{fx.alertMode ? "ALERT" : fx.ambientScan ? "AMBIENT" : "ACTIVE"}</Text>
      </View>

      <View style={styles.radarBox}>
        <View style={[styles.circle, { width: size, height: size, borderColor: fx.radarColor }]} />
        <View style={[styles.sweep, { backgroundColor: fx.radarColor, opacity: Math.min(0.9, fx.sweepIntensity) }]} />
      </View>

      <Text style={styles.meta}>
        SWEEP {fx.sweepIntensity.toFixed(2)} • SPEED x{fx.sweepSpeed.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.22)",
    gap: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  mode: {
    color: "rgba(255,255,255,0.58)",
    fontSize: 10,
    fontWeight: "800",
  },
  radarBox: {
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  circle: {
    borderWidth: 1,
    borderRadius: 999,
  },
  sweep: {
    position: "absolute",
    width: 2,
    height: 84,
    transform: [{ rotate: "35deg" }],
  },
  meta: {
    color: "rgba(255,255,255,0.58)",
    fontSize: 11,
    fontWeight: "700",
  },
});
