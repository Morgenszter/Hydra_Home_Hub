import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraConsoleFxProps } from "../../theme/HydraDesignBindings";

export type BoundHydraConsoleProps = {
  fx: HydraConsoleFxProps;
};

export function BoundHydraConsole({ fx }: BoundHydraConsoleProps) {
  return (
    <View style={[styles.panel, { borderColor: fx.borderColor }]}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: fx.textColor }]}>COMMAND CONSOLE FX</Text>
        <Text style={[styles.severity, { color: fx.textColor }]}>{fx.severity.toUpperCase()}</Text>
      </View>
      <Text style={[styles.message, { color: fx.textColor }]}>{fx.latestMessage}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(100, fx.flashLevel * 100)}%`, backgroundColor: fx.textColor }]} />
      </View>
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
  severity: {
    fontSize: 10,
    fontWeight: "900",
  },
  message: {
    fontSize: 12,
    fontWeight: "700",
  },
  track: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
  },
});
