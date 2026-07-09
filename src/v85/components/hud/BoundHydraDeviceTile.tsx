import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraDeviceTileFxProps } from "../../theme/HydraDesignBindings";
import { HydraDevice } from "../../types/hydraProtocol";

export type BoundHydraDeviceTileProps = {
  device: HydraDevice;
  fx: HydraDeviceTileFxProps;
};

export function BoundHydraDeviceTile({ device, fx }: BoundHydraDeviceTileProps) {
  return (
    <View style={[styles.tile, { borderColor: fx.statusColor, opacity: fx.isCritical ? 1 : 0.9 }]}>
      <View style={styles.row}>
        <Text style={[styles.name, { color: fx.statusColor }]}>{device.name}</Text>
        <Text style={styles.kind}>{device.kind.toUpperCase()}</Text>
      </View>
      <Text style={styles.status}>{fx.label}</Text>
      <Text style={styles.meta}>
        FOCUS {fx.isFocused ? "YES" : "NO"} • GLOW {fx.glowLevel.toFixed(2)} • PULSE {fx.borderPulse.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.22)",
    gap: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },
  kind: {
    color: "rgba(255,255,255,0.54)",
    fontSize: 10,
    fontWeight: "800",
  },
  status: {
    color: "#eafff8",
    fontSize: 12,
    fontWeight: "800",
  },
  meta: {
    color: "rgba(255,255,255,0.54)",
    fontSize: 10,
    fontWeight: "700",
  },
});
