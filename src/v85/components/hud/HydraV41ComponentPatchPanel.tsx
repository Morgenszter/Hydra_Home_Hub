import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HydraVisualFXState } from "../../animation/HydraVisualFXBridge";
import { HydraSessionState } from "../../hydraModule/protocol/hydraSessionState";
import { bindHydraDeviceTileFx, HydraConsoleFxProps, HydraRadarFxProps } from "../../theme/HydraDesignBindings";
import { HydraThemePalette } from "../../theme/hydraThemes";
import { HydraDevice } from "../../types/hydraProtocol";
import { HydraPatchedConsoleLog } from "./HydraPatchedConsoleLog";
import { HydraPatchedDeviceStatus } from "./HydraPatchedDeviceStatus";
import { HydraPatchedRadar } from "./HydraPatchedRadar";

export type HydraV41ComponentPatchPanelProps = {
  devices: HydraDevice[];
  visualFx: HydraVisualFXState;
  session: HydraSessionState;
  palette: HydraThemePalette;
  radarFx: HydraRadarFxProps;
  consoleFx: HydraConsoleFxProps;
};

export function HydraV41ComponentPatchPanel({
  devices,
  visualFx,
  session,
  palette,
  radarFx,
  consoleFx,
}: HydraV41ComponentPatchPanelProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={[styles.title, { color: palette.accent }]}>SAFE COMPONENT PATCH</Text>
      <HydraPatchedRadar fx={radarFx} />
      <HydraPatchedConsoleLog message={session.lastMessage} fx={consoleFx} />
      <View style={styles.deviceList}>
        {devices.map((device) => {
          const fx = bindHydraDeviceTileFx(device, visualFx, session, palette);
          return (
            <HydraPatchedDeviceStatus
              key={device.id}
              name={device.name}
              kind={device.kind}
              status={fx.label}
              fx={fx}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 10 },
  title: { fontSize: 13, fontWeight: "900", letterSpacing: 1.4 },
  deviceList: { gap: 8 },
});
