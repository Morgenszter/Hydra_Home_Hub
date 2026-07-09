import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraStatusFxProps } from "../../theme/HydraDesignBindings";

export type BoundHydraStatusPanelProps = {
  fx: HydraStatusFxProps;
};

export function BoundHydraStatusPanel({ fx }: BoundHydraStatusPanelProps) {
  return (
    <View style={[styles.panel, { borderColor: fx.color }]}>
      <View style={styles.row}>
        <Text style={[styles.label, { color: fx.color }]}>{fx.label}</Text>
        <Text style={styles.lock}>{fx.locked ? "THEME LOCK" : "AUTO"}</Text>
      </View>
      <Text style={styles.message}>{fx.message}</Text>
      <Text style={[styles.severity, { color: fx.color }]}>{fx.severity.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
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
  label: {
    fontSize: 14,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  lock: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 10,
    fontWeight: "800",
  },
  message: {
    color: "#eafff8",
    fontSize: 12,
    fontWeight: "700",
  },
  severity: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
