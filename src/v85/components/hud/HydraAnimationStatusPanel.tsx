import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HydraAnimationEngineState } from "../../animation/HydraAnimationEngine";

export type HydraAnimationStatusPanelProps = {
  state: HydraAnimationEngineState;
  onClear?: () => void;
  onComplete?: () => void;
};

export function HydraAnimationStatusPanel({ state, onClear, onComplete }: HydraAnimationStatusPanelProps) {
  const current = state.current;

  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>SILNIK ANIMACJI</Text>
        <Text style={styles.counter}>QUEUE {state.queue.length}</Text>
      </View>

      {current ? (
        <>
          <Text style={styles.kind}>{current.kind.toUpperCase()}</Text>
          <Text style={styles.message}>{current.message}</Text>
          <Text style={styles.meta}>
            INT {current.intensity.toFixed(2)} • {current.durationMs}MS
          </Text>

          <View style={styles.row}>
            <Pressable style={styles.button} onPress={onComplete}>
              <Text style={styles.buttonText}>SKIP</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onClear}>
              <Text style={styles.buttonText}>CLEAR</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <Text style={styles.empty}>Brak aktywnej animacji.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(255, 80, 120, 0.36)",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "rgba(24, 3, 10, 0.58)",
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#ff8fab",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  counter: {
    color: "rgba(255,143,171,0.7)",
    fontWeight: "800",
    fontSize: 11,
  },
  kind: {
    color: "#8dffdc",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  message: {
    color: "#fff5f8",
    fontSize: 14,
    fontWeight: "700",
  },
  meta: {
    color: "rgba(255,230,238,0.58)",
    fontSize: 12,
  },
  empty: {
    color: "rgba(255,230,238,0.44)",
    fontSize: 12,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(255,143,171,0.5)",
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "rgba(255,143,171,0.08)",
  },
  buttonText: {
    color: "#ff8fab",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
