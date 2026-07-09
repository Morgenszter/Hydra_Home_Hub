import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraHudReaction, getReactionRemainingIntensity } from "./hydraHudReactionEngine";
import { HydraThemePalette } from "../../theme/hydraThemes";

export type HydraHudReactionPanelProps = {
  reactions: HydraHudReaction[];
  palette: HydraThemePalette;
};

export function HydraHudReactionPanel({ reactions, palette }: HydraHudReactionPanelProps) {
  const recent = reactions.slice(-6).reverse();

  return (
    <View style={[styles.panel, { borderColor: palette.border, backgroundColor: palette.panel }]}>
      <Text style={[styles.title, { color: palette.accent }]}>EVENT HUD REACTIONS</Text>
      {recent.length === 0 ? (
        <Text style={[styles.empty, { color: palette.textSecondary }]}>Brak aktywnych reakcji HUD.</Text>
      ) : (
        recent.map((reaction) => (
          <View key={reaction.id} style={styles.row}>
            <Text style={[styles.label, { color: colorFor(reaction.severity, palette) }]}>
              {reaction.label}
            </Text>
            <Text style={[styles.meta, { color: palette.textSecondary }]}>
              {reaction.targetFrame} • {getReactionRemainingIntensity(reaction).toFixed(2)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

function colorFor(severity: HydraHudReaction["severity"], palette: HydraThemePalette) {
  if (severity === "critical") return palette.error;
  if (severity === "warning") return palette.warning;
  if (severity === "success") return palette.success;
  return palette.accent;
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 12,
    gap: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  empty: {
    fontSize: 11,
    fontWeight: "700",
  },
  row: {
    gap: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.07)",
    paddingBottom: 6,
  },
  label: {
    fontSize: 11,
    fontWeight: "900",
  },
  meta: {
    fontSize: 10,
    fontWeight: "700",
  },
});
