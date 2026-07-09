import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraConsoleComponentFx } from "../../theme/HydraComponentFx";

export type HydraPatchedConsoleLogProps = {
  title?: string;
  message: string;
  fx?: HydraConsoleComponentFx;
};

export function HydraPatchedConsoleLog({ title = "CONSOLE", message, fx }: HydraPatchedConsoleLogProps) {
  const textColor = fx?.textColor ?? "#eafff8";
  const borderColor = fx?.borderColor ?? "rgba(141,255,220,0.25)";
  const flashLevel = Math.min(1, Math.max(0, fx?.flashLevel ?? 0));

  return (
    <View style={[styles.panel, { borderColor }]}>
      <View style={styles.row}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        <Text style={[styles.severity, { color: textColor }]}>{(fx?.severity ?? "normal").toUpperCase()}</Text>
      </View>
      <Text style={[styles.message, { color: textColor }]}>{message}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${flashLevel * 100}%`, backgroundColor: textColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderWidth: 1, borderRadius: 16, padding: 12, backgroundColor: "rgba(0,0,0,0.22)", gap: 8 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  title: { fontSize: 13, fontWeight: "900", letterSpacing: 1.2 },
  severity: { fontSize: 10, fontWeight: "900" },
  message: { fontSize: 12, fontWeight: "700" },
  track: { height: 6, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.08)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 999 },
});
