import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraVisualFXState } from "../../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../../hydraModule/protocol/hydraSessionState";
import { HydraThemePalette } from "../../theme/hydraThemes";
import { HydraAlphaLegionBadge } from "./HydraAlphaLegionBadge";
import { HydraHudFrame } from "./HydraHudFrame";

export type HydraAlphaLegionHudPanelProps = {
  session: HydraSessionState;
  visualFx: HydraVisualFXState;
  palette: HydraThemePalette;
};

export function HydraAlphaLegionHudPanel({
  session,
  visualFx,
  palette,
}: HydraAlphaLegionHudPanelProps) {
  const intensity = Math.max(visualFx.borderGlow, visualFx.pulseLevel, session.alertState.active ? 1 : 0.45);

  return (
    <HydraHudFrame
      variant="wide_top_bottom_serpents"
      palette={palette}
      intensity={intensity}
      contentStyle={styles.content}
    >
      <View style={styles.header}>
        <HydraAlphaLegionBadge palette={palette} />
        <View style={styles.statusBlock}>
          <Text style={[styles.mode, { color: palette.accent }]}>{session.mode}</Text>
          <Text style={[styles.meta, { color: palette.textSecondary }]}>
            {session.themeMode.toUpperCase()} • {session.themeLocked ? "LOCKED" : "AUTO"}
          </Text>
        </View>
      </View>

      <View style={styles.grid}>
        <Metric label="ALERT" value={`${session.alertState.level.toUpperCase()} / ${session.alertState.active ? "ACTIVE" : "CLEAR"}`} palette={palette} />
        <Metric label="SCENE" value={`${session.sceneState.phase ?? "NONE"}`} palette={palette} />
        <Metric label="COMMAND" value={`${session.commandState.status ?? "NONE"}`} palette={palette} />
        <Metric label="FX" value={`GLOW ${visualFx.borderGlow.toFixed(2)} / RAD ${visualFx.radarSweep.toFixed(2)}`} palette={palette} />
      </View>
    </HydraHudFrame>
  );
}

function Metric({ label, value, palette }: { label: string; value: string; palette: HydraThemePalette }) {
  return (
    <View style={[styles.metric, { borderColor: palette.border, backgroundColor: palette.accentSoft }]}>
      <Text style={[styles.metricLabel, { color: palette.textSecondary }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: palette.textPrimary }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  statusBlock: {
    alignItems: "flex-end",
    gap: 3,
  },
  mode: {
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 2,
  },
  meta: {
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metric: {
    minWidth: "46%",
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
  },
  metricLabel: {
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1,
  },
  metricValue: {
    fontSize: 11,
    fontWeight: "900",
  },
});
