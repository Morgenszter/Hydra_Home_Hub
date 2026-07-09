import React from "react";
import { View, Text } from "react-native";
import { HydraConnectionStage } from "../../mobile/offline/hydraOfflineState";

const LABELS: Record<HydraConnectionStage, string> = {
  DISCONNECTED: "HUD offline",
  PROBING: "Probing bridge",
  PAIRING_REQUIRED: "Pairing required",
  CONNECTING: "Connecting to HYDRA bridge",
  CONNECTED: "Connected, synchronizing",
  DEGRADED: "Connection degraded",
  REPLAYING: "Replaying cockpit state",
  READY: "HYDRA ready",
};

export function HydraRecoveryBanner({ stage }: { stage: HydraConnectionStage }) {
  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 14,
        backgroundColor: "rgba(0, 24, 18, 0.72)",
        borderWidth: 1,
        borderColor: "rgba(141,255,220,0.35)",
      }}
    >
      <Text
        style={{
          color: "#dffff6",
          fontWeight: "800",
          letterSpacing: 0.8,
        }}
      >
        {LABELS[stage]}
      </Text>
    </View>
  );
}
