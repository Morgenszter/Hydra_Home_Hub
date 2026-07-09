import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraDeviceComponentFx } from "../../theme/HydraComponentFx";

export type HydraPatchedDeviceStatusProps = {
  name: string;
  kind: string;
  status: string;
  fx?: HydraDeviceComponentFx;
};

export function HydraPatchedDeviceStatus({ name, kind, status, fx }: HydraPatchedDeviceStatusProps) {
  const statusColor = fx?.statusColor ?? "#8dffdc";

  return (
    <View style={[styles.panel, { borderColor: statusColor, opacity: fx?.isCritical ? 1 : 0.92 }]}>
      <View style={styles.row}>
        <Text style={[styles.name, { color: statusColor }]}>{name}</Text>
        <Text style={styles.kind}>{kind.toUpperCase()}</Text>
      </View>
      <Text style={styles.status}>{status}</Text>
      <Text style={styles.meta}>
        FOCUS {fx?.isFocused ? "YES" : "NO"} • GLOW {(fx?.glowLevel ?? 0).toFixed(2)} • PULSE {(fx?.borderPulse ?? 0).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: { borderWidth: 1, borderRadius: 16, padding: 12, backgroundColor: "rgba(0,0,0,0.22)", gap: 6 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 13, fontWeight: "900", letterSpacing: 1 },
  kind: { color: "rgba(255,255,255,0.54)", fontSize: 10, fontWeight: "800" },
  status: { color: "#eafff8", fontSize: 12, fontWeight: "800" },
  meta: { color: "rgba(255,255,255,0.54)", fontSize: 10, fontWeight: "700" },
});
