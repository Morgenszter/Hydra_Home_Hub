import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraVisualFXState } from "../../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../../hydraModule/protocol/hydraSessionState";
import { bindHydraDeviceTileFx, HydraConsoleFxProps, HydraRadarFxProps, HydraStatusFxProps } from "../../theme/HydraDesignBindings";
import { HydraThemePalette } from "../../theme/hydraThemes";
import { HydraDevice } from "../../types/hydraProtocol";
import { BoundHydraConsole } from "./BoundHydraConsole";
import { BoundHydraDeviceTile } from "./BoundHydraDeviceTile";
import { BoundHydraRadar } from "./BoundHydraRadar";
import { BoundHydraStatusPanel } from "./BoundHydraStatusPanel";

export type HydraRealHudBindingsPanelProps = {
  devices: HydraDevice[];
  visualFx: HydraVisualFXState;
  session: HydraSessionState;
  palette: HydraThemePalette;
  radarFx: HydraRadarFxProps;
  consoleFx: HydraConsoleFxProps;
  statusFx: HydraStatusFxProps;
};

export function HydraRealHudBindingsPanel({
  devices,
  visualFx,
  session,
  palette,
  radarFx,
  consoleFx,
  statusFx,
}: HydraRealHudBindingsPanelProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: palette.accent }]}>REAL HUD BINDINGS</Text>
      <BoundHydraStatusPanel fx={statusFx} />
      <BoundHydraRadar fx={radarFx} />
      <BoundHydraConsole fx={consoleFx} />

      <View style={styles.deviceList}>
        {devices.map((device) => (
          <BoundHydraDeviceTile
            key={device.id}
            device={device}
            fx={bindHydraDeviceTileFx(device, visualFx, session, palette)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  deviceList: {
    gap: 8,
  },
});
