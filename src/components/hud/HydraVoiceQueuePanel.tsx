import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { HydraAudioQueueItem, HydraAudioQueueStatus } from "../../audio/HydraAudioQueueEngine";

export type HydraVoiceQueuePanelProps = {
  current?: HydraAudioQueueItem | null;
  queuedCount: number;
  status: HydraAudioQueueStatus;
  muted: boolean;
  onCompleteCurrent?: () => void;
  onToggleMuted?: () => void;
  onClear?: () => void;
};

export function HydraVoiceQueuePanel({
  current,
  queuedCount,
  status,
  muted,
  onCompleteCurrent,
  onToggleMuted,
  onClear,
}: HydraVoiceQueuePanelProps) {
  return (
    <View style={styles.panel}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>GŁOS HYDRA</Text>
        <Text style={styles.counter}>{status.toUpperCase()} • QUEUE {queuedCount}</Text>
      </View>

      {current ? (
        <>
          <Text style={styles.cue}>{current.cue.toUpperCase()}</Text>
          <Text style={styles.line}>{current.text}</Text>
          <Text style={styles.pending}>Asset: {current.assetId ?? "TEXT_FALLBACK"}</Text>

          <View style={styles.row}>
            <Pressable style={styles.button} onPress={onCompleteCurrent}>
              <Text style={styles.buttonText}>ZAKOŃCZ</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onToggleMuted}>
              <Text style={styles.buttonText}>{muted ? "DŹWIĘK ON" : "MUTE"}</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onClear}>
              <Text style={styles.buttonText}>WYCZYŚĆ</Text>
            </Pressable>
          </View>
        </>
      ) : (
        <>
          <Text style={styles.empty}>Kolejka audio jest pusta.</Text>
          <Pressable style={styles.singleButton} onPress={onToggleMuted}>
            <Text style={styles.buttonText}>{muted ? "DŹWIĘK ON" : "MUTE"}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(120,190,255,0.42)",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "rgba(3,10,24,0.72)",
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#9bd0ff",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  counter: {
    color: "rgba(155,208,255,0.66)",
    fontWeight: "800",
    fontSize: 11,
  },
  cue: {
    color: "#8dffdc",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  line: {
    color: "#f1fffb",
    fontSize: 15,
    fontWeight: "700",
  },
  pending: {
    color: "rgba(220,240,255,0.58)",
    fontSize: 12,
  },
  empty: {
    color: "rgba(220,240,255,0.46)",
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
    borderColor: "rgba(155,208,255,0.52)",
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "rgba(155,208,255,0.1)",
  },
  singleButton: {
    borderWidth: 1,
    borderColor: "rgba(155,208,255,0.52)",
    borderRadius: 12,
    paddingVertical: 9,
    alignItems: "center",
    backgroundColor: "rgba(155,208,255,0.1)",
  },
  buttonText: {
    color: "#9bd0ff",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
});
