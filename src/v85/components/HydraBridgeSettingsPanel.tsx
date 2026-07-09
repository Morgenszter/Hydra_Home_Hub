import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useHydraBridgeContext } from "../context/HydraBridgeProvider";

export function HydraBridgeSettingsPanel() {
  const hydra = useHydraBridgeContext();
  const [draftUrl, setDraftUrl] = useState(hydra.baseUrl);
  const [saving, setSaving] = useState(false);

  const statusLabel = useMemo(() => {
    switch (hydra.connectionState) {
      case "online":
        return "ONLINE";
      case "connecting":
        return "ŁĄCZENIE";
      case "offline":
        return "OFFLINE";
      case "error":
        return "BŁĄD";
      default:
        return "GOTOWOŚĆ";
    }
  }, [hydra.connectionState]);

  async function save() {
    setSaving(true);
    try {
      await hydra.updateBridgeUrl(draftUrl);
      await hydra.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.title}>HYDRA Bridge</Text>
      <Text style={styles.subtitle}>Lokalny adres mostu dowodzenia</Text>

      <TextInput
        value={draftUrl}
        onChangeText={setDraftUrl}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="http://192.168.1.20:8765"
        placeholderTextColor="rgba(137, 255, 220, 0.35)"
        style={styles.input}
      />

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={save} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? "ZAPIS..." : "ZAPISZ"}</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={hydra.refresh}>
          <Text style={styles.secondaryButtonText}>PING</Text>
        </Pressable>
      </View>

      <View style={styles.statusRow}>
        <View style={[styles.dot, hydra.connectionState === "online" ? styles.dotOnline : styles.dotOffline]} />
        <Text style={styles.statusText}>STATUS: {statusLabel}</Text>
        {hydra.connectionState === "connecting" && <ActivityIndicator size="small" />}
      </View>

      {hydra.error ? <Text style={styles.error}>Błąd: {hydra.error}</Text> : null}
      <Text style={styles.meta}>Urządzenia: {hydra.devices.length} • Sceny: {hydra.scenes.length} • Eventy: {hydra.events.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "rgba(0, 255, 180, 0.45)",
    backgroundColor: "rgba(0, 20, 18, 0.78)",
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  title: {
    color: "#8dffdc",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  subtitle: {
    color: "rgba(210, 255, 242, 0.72)",
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(137, 255, 220, 0.38)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#eafff8",
    backgroundColor: "rgba(0, 0, 0, 0.24)",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "rgba(0, 255, 180, 0.18)",
    borderWidth: 1,
    borderColor: "rgba(0, 255, 180, 0.55)",
  },
  buttonText: {
    color: "#9affdf",
    fontWeight: "900",
    letterSpacing: 1,
  },
  secondaryButton: {
    minWidth: 92,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(120, 190, 255, 0.55)",
  },
  secondaryButtonText: {
    color: "#9bd0ff",
    fontWeight: "900",
    letterSpacing: 1,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 9,
  },
  dotOnline: {
    backgroundColor: "#00ffaa",
  },
  dotOffline: {
    backgroundColor: "#ff4d6d",
  },
  statusText: {
    color: "#dffff7",
    fontWeight: "700",
  },
  error: {
    color: "#ff8fa3",
    fontSize: 12,
  },
  meta: {
    color: "rgba(210, 255, 242, 0.6)",
    fontSize: 12,
  },
});
