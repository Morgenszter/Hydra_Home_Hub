import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraVisualFXState } from "../../animation/HydraVisualFXBridge";
import { HydraThemePalette } from "../../theme/hydraThemes";

export type HydraVisualOverlayProps = {
  fx: HydraVisualFXState;
  palette: HydraThemePalette;
};

export function HydraVisualOverlay({ fx, palette }: HydraVisualOverlayProps) {
  return (
    <View
      style={[
        styles.container,
        {
          borderColor: palette.border,
          backgroundColor: palette.panel,
          shadowColor: palette.accent,
          shadowOpacity: Math.max(0.08, fx.borderGlow * 0.45),
        },
      ]}
    >
      <View
        style={[
          styles.overlay,
          {
            opacity: Math.min(0.95, fx.alertOverlay + fx.pulseLevel * 0.15),
            backgroundColor: palette.overlay,
          },
        ]}
      />
      <View style={styles.row}>
        <Text style={[styles.label, { color: palette.accent }]}>VISUAL FX</Text>
        <Text style={[styles.mode, { color: palette.textSecondary }]}>{fx.themeMode.toUpperCase()}</Text>
      </View>

      <Text style={[styles.message, { color: palette.textPrimary }]}>
        {fx.message ?? "Brak aktywnej animacji wizualnej."}
      </Text>

      <View style={styles.meters}>
        <Meter label="GLOW" value={fx.borderGlow} color={palette.accent} />
        <Meter label="RADAR" value={fx.radarSweep} color={palette.radar} />
        <Meter label="FLASH" value={fx.consoleFlash} color={palette.warning} />
        <Meter label="ALERT" value={fx.alertOverlay} color={palette.error} />
      </View>
    </View>
  );
}

function Meter({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <View style={styles.meterRow}>
      <Text style={styles.meterLabel}>{label}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.max(0, Math.min(100, value * 100))}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 10,
    overflow: "hidden",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  mode: {
    fontSize: 11,
    fontWeight: "800",
  },
  message: {
    fontSize: 13,
    fontWeight: "700",
  },
  meters: {
    gap: 8,
  },
  meterRow: {
    gap: 4,
  },
  meterLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
