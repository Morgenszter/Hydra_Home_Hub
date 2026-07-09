import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type HydraExistingHudPatchReportPanelProps = {
  discoveredFiles: string[];
};

export function HydraExistingHudPatchReportPanel({ discoveredFiles }: HydraExistingHudPatchReportPanelProps) {
  return (
    <View style={styles.panel}>
      <Text style={styles.title}>EXISTING HUD PATCH REPORT</Text>
      {discoveredFiles.length === 0 ? (
        <Text style={styles.item}>Nie znaleziono osobnych plików Radar/Console/DeviceStatus poza modułami HYDRA.</Text>
      ) : (
        discoveredFiles.slice(0, 12).map((file) => (
          <Text key={file} style={styles.item}>• {file}</Text>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(255,209,102,0.35)",
    borderRadius: 16,
    padding: 12,
    backgroundColor: "rgba(20,14,3,0.32)",
    gap: 6,
  },
  title: {
    color: "#ffd166",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  item: {
    color: "rgba(255,245,220,0.76)",
    fontSize: 11,
    fontWeight: "700",
  },
});
