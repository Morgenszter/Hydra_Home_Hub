import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraVisualFXState } from "../../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../../hydraModule/protocol/hydraSessionState";
import { HydraThemePalette } from "../../theme/hydraThemes";
import { useHydraFrameBinding } from "../../hooks/useHydraFrameBinding";
import { HydraHudFrame } from "./HydraHudFrame";

export type HydraBoundFramePanelsProps = {
  session: HydraSessionState;
  visualFx: HydraVisualFXState;
  palette: HydraThemePalette;
  focusedDeviceId?: string | null;
};

export function HydraBoundFramePanels({
  session,
  visualFx,
  palette,
  focusedDeviceId,
}: HydraBoundFramePanelsProps) {
  const binding = useHydraFrameBinding(session, visualFx, focusedDeviceId);

  return (
    <View style={styles.wrapper}>
      <HydraHudFrame
        variant={binding.dashboardVariant}
        intensity={binding.dashboardIntensity}
        palette={palette}
        contentStyle={styles.frameContent}
      >
        <PanelTitle title="DASHBOARD BINDING" palette={palette} />
        <PanelValue
          label="variant"
          value={binding.dashboardVariant}
          palette={palette}
        />
        <PanelValue
          label="reason"
          value={binding.reason.join(", ") || "default"}
          palette={palette}
        />
      </HydraHudFrame>

      <HydraHudFrame
        variant={binding.focusVariant}
        intensity={binding.focusIntensity}
        palette={palette}
        contentStyle={styles.frameContent}
      >
        <PanelTitle title="FOCUS / VOICE CORE" palette={palette} />
        <PanelValue
          label="variant"
          value={binding.focusVariant}
          palette={palette}
        />
        <PanelValue
          label="command"
          value={session.commandState.status}
          palette={palette}
        />
      </HydraHudFrame>

      <HydraHudFrame
        variant={binding.telemetryVariant}
        intensity={binding.telemetryIntensity}
        palette={palette}
        contentStyle={styles.frameContent}
      >
        <PanelTitle title="TELEMETRY / DEVICE" palette={palette} />
        <PanelValue
          label="variant"
          value={binding.telemetryVariant}
          palette={palette}
        />
        <PanelValue
          label="focus"
          value={focusedDeviceId ?? "none"}
          palette={palette}
        />
      </HydraHudFrame>
    </View>
  );
}

function PanelTitle({
  title,
  palette,
}: {
  title: string;
  palette: HydraThemePalette;
}) {
  return <Text style={[styles.title, { color: palette.accent }]}>{title}</Text>;
}

function PanelValue({
  label,
  value,
  palette,
}: {
  label: string;
  value: string;
  palette: HydraThemePalette;
}) {
  return (
    <View style={[styles.metric, { borderColor: palette.border }]}>
      <Text style={[styles.metricLabel, { color: palette.textSecondary }]}>{label}</Text>
      <Text style={[styles.metricValue, { color: palette.textPrimary }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  frameContent: {
    minHeight: 110,
    gap: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  metric: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 8,
    backgroundColor: "rgba(0,0,0,0.16)",
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
