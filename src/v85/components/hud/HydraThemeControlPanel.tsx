import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HydraThemeMode } from "../../theme/hydraThemes";

export type HydraThemeControlPanelProps = {
  mode: HydraThemeMode;
  locked: boolean;
  onModeChange: (mode: HydraThemeMode) => void;
  onToggleLock: () => void;
};

const MODES: HydraThemeMode[] = ["green", "blue", "red_alert", "night_ops"];

export function HydraThemeControlPanel({
  mode,
  locked,
  onModeChange,
  onToggleLock,
}: HydraThemeControlPanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>THEME ENGINE</Text>
        <Text style={styles.meta}>{locked ? "LOCKED" : "AUTO"}</Text>
      </View>

      <View style={styles.row}>
        {MODES.map((item) => (
          <Pressable
            key={item}
            style={[styles.button, item === mode && styles.buttonActive]}
            onPress={() => onModeChange(item)}
          >
            <Text style={[styles.buttonText, item === mode && styles.buttonTextActive]}>
              {item.toUpperCase()}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={styles.lockButton} onPress={onToggleLock}>
        <Text style={styles.lockText}>{locked ? "ODBLOKUJ AUTO-THEME" : "ZABLOKUJ BIEŻĄCY MOTYW"}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(141,255,220,0.26)",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "rgba(0,0,0,0.18)",
    gap: 10,
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
  meta: {
    color: "rgba(220,255,246,0.6)",
    fontSize: 11,
    fontWeight: "800",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(141,255,220,0.2)",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "rgba(141,255,220,0.05)",
  },
  buttonActive: {
    borderColor: "rgba(141,255,220,0.6)",
    backgroundColor: "rgba(141,255,220,0.16)",
  },
  buttonText: {
    color: "rgba(220,255,246,0.72)",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  buttonTextActive: {
    color: "#eafff8",
  },
  lockButton: {
    borderWidth: 1,
    borderColor: "rgba(141,255,220,0.26)",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  lockText: {
    color: "#8dffdc",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
