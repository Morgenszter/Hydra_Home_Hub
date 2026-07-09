import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HydraRecoveryBanner } from "../components/hud/HydraRecoveryBanner";
import { useHydraRuntimeBridge } from "../hooks/useHydraRuntimeBridge";

export function HydraHudRecoveryScreen({ bridgeUrl }: { bridgeUrl: string }) {
  const { state, ready } = useHydraRuntimeBridge(bridgeUrl);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#010504",
        padding: 18,
        gap: 16,
      }}
    >
      <HydraRecoveryBanner stage={state.connectionStage} />
      <View
        style={{
          borderRadius: 18,
          padding: 16,
          backgroundColor: "rgba(0, 18, 16, 0.72)",
          borderWidth: 1,
          borderColor: "rgba(141,255,220,0.22)",
        }}
      >
        <Text style={{ color: "#e8fff8", fontSize: 20, fontWeight: "900", marginBottom: 10 }}>
          HYDRA HUD Recovery
        </Text>
        <Text style={{ color: "rgba(232,255,248,0.74)", marginBottom: 8 }}>
          Ready: {ready ? "YES" : "NO"}
        </Text>
        <Text style={{ color: "rgba(232,255,248,0.74)", marginBottom: 8 }}>
          Last bridge: {state.lastConnectedBridge ?? "—"}
        </Text>
        <Text style={{ color: "rgba(232,255,248,0.74)" }}>
          Last sync: {state.lastSuccessfulSyncAt ? new Date(state.lastSuccessfulSyncAt).toISOString() : "—"}
        </Text>
      </View>
      <View
        style={{
          borderRadius: 18,
          padding: 16,
          backgroundColor: "rgba(0, 18, 16, 0.52)",
          borderWidth: 1,
          borderColor: "rgba(141,255,220,0.14)",
        }}
      >
        <Text style={{ color: "#e8fff8", fontWeight: "800", marginBottom: 10 }}>Cached device states</Text>
        <Text style={{ color: "rgba(232,255,248,0.72)" }}>
          {JSON.stringify(state.deviceStates, null, 2)}
        </Text>
      </View>
    </ScrollView>
  );
}
