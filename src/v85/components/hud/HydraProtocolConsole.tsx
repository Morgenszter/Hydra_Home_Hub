import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { HydraHudSignal } from "../../services/hydraHudEventBridge";

export type HydraProtocolConsoleProps = {
  signals: HydraHudSignal[];
  maxItems?: number;
};

export function HydraProtocolConsole({ signals, maxItems = 8 }: HydraProtocolConsoleProps) {
  const visible = signals.slice(-maxItems).reverse();

  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>KONSOLA PROTOKOŁU</Text>
        <Text style={styles.counter}>{signals.length}</Text>
      </View>

      {visible.length === 0 ? (
        <Text style={styles.empty}>Oczekiwanie na zdarzenia HYDRA...</Text>
      ) : (
        <FlatList
          data={visible}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Text style={[styles.type, getTypeStyle(item.type)]}>{item.type.toUpperCase()}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function getTypeStyle(type: string) {
  if (type.includes("error")) return styles.error;
  if (type.includes("warning")) return styles.warning;
  if (type.includes("success") || type.includes("done")) return styles.success;
  if (type.includes("scene")) return styles.scene;
  return styles.log;
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(0,255,180,0.42)",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "rgba(0,18,16,0.76)",
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#8dffdc",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  counter: {
    color: "rgba(141,255,220,0.7)",
    fontWeight: "800",
  },
  empty: {
    color: "rgba(220,255,246,0.48)",
    fontSize: 12,
    fontStyle: "italic",
  },
  row: {
    borderTopWidth: 1,
    borderTopColor: "rgba(141,255,220,0.12)",
    paddingVertical: 7,
    gap: 3,
  },
  type: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  message: {
    color: "#eafff8",
    fontSize: 12,
  },
  log: {
    color: "rgba(220,255,246,0.58)",
  },
  success: {
    color: "#00ffaa",
  },
  warning: {
    color: "#ffd166",
  },
  error: {
    color: "#ff4d6d",
  },
  scene: {
    color: "#8ab4ff",
  },
});
