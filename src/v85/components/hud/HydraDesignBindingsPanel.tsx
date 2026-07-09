import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  HydraConsoleFxProps,
  HydraHudFxProps,
  HydraRadarFxProps,
  HydraStatusFxProps,
} from "../../theme/HydraDesignBindings";

export type HydraDesignBindingsPanelProps = {
  hud: HydraHudFxProps;
  radar: HydraRadarFxProps;
  consoleFx: HydraConsoleFxProps;
  status: HydraStatusFxProps;
};

export function HydraDesignBindingsPanel({
  hud,
  radar,
  consoleFx,
  status,
}: HydraDesignBindingsPanelProps) {
  return (
    <View style={[styles.panel, { borderColor: hud.borderColor, backgroundColor: hud.panelColor }]}>
      <View style={styles.headerRow}>
        <Text style={[styles.title, { color: status.color }]}>DESIGN BINDINGS</Text>
        <Text style={styles.mode}>{hud.sessionMode} / {hud.themeMode}</Text>
      </View>

      <View style={styles.grid}>
        <Metric label="STATUS" value={`${status.label} ${status.locked ? "LOCK" : ""}`} color={status.color} />
        <Metric label="GLOW" value={hud.glowLevel.toFixed(2)} color={status.color} />
        <Metric label="RADAR" value={`${radar.sweepIntensity.toFixed(2)} x${radar.sweepSpeed.toFixed(2)}`} color={radar.radarColor} />
        <Metric label="CONSOLE" value={consoleFx.severity.toUpperCase()} color={consoleFx.textColor} />
        <Metric label="ALERT" value={hud.alertOverlay.toFixed(2)} color={status.color} />
        <Metric label="SCAN" value={hud.scanlineOpacity.toFixed(2)} color={status.color} />
      </View>

      <Text style={[styles.message, { color: consoleFx.textColor }]}>{status.message}</Text>
    </View>
  );
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  mode: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 11,
    fontWeight: "800",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metric: {
    minWidth: "30%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: 8,
  },
  metricLabel: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: "900",
  },
  message: {
    fontSize: 12,
    fontWeight: "700",
  },
});
