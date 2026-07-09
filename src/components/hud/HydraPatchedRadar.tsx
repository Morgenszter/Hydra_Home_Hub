import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraRadarComponentFx } from "../../theme/HydraComponentFx";

export type HydraPatchedRadarProps = {
  label?: string;
  fx?: HydraRadarComponentFx;
};

export function HydraPatchedRadar({ label = "RADAR", fx }: HydraPatchedRadarProps) {
  const radarColor = fx?.radarColor ?? "#8dffdc";
  const sweepIntensity = fx?.sweepIntensity ?? 0.22;
  const size = Math.round(44 + sweepIntensity * 52);

  return (
    <View style={[styles.panel, { borderColor: radarColor }]}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: radarColor }]}>{label}</Text>
        <Text style={styles.mode}>{fx?.alertMode ? "ALERT" : "ACTIVE"}</Text>
      </View>
      <View style={styles.radarBox}>
        <View style={[styles.circle, { width: size, height: size, borderColor: radarColor }]} />
        <View style={[styles.sweep, { backgroundColor: radarColor, opacity: Math.min(0.9, sweepIntensity) }]} />
      </View>
      <Text style={styles.meta}>SWEEP {sweepIntensity.toFixed(2)} • SPEED x{(fx?.sweepSpeed ?? 1).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderWidth: 1, borderRadius: 16, padding: 12, backgroundColor: "rgba(0,0,0,0.22)", gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 13, fontWeight: "900", letterSpacing: 1.2 },
  mode: { color: "rgba(255,255,255,0.58)", fontSize: 10, fontWeight: "800" },
  radarBox: { height: 92, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  circle: { borderWidth: 1, borderRadius: 999 },
  sweep: { position: "absolute", width: 2, height: 84, transform: [{ rotate: "35deg" }] },
  meta: { color: "rgba(255,255,255,0.58)", fontSize: 11, fontWeight: "700" },
});
