import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

type Props = {
  bridgeState: any;
  onAction?: (action: string) => void;
};

const ACTIONS = [
  "pairing",
  "restart_bridge",
  "restart_discovery",
  "logs",
  "emergency_red_alert",
];

export default function HydraOperatorScreen({ bridgeState, onAction }: Props) {
  const result = bridgeState?.operatorResult;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#020605" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <View style={{ borderWidth: 1, borderColor: "#1e4a3d", borderRadius: 16, padding: 16 }}>
        <Text style={{ color: "#8dffdc", fontSize: 22, fontWeight: "800" }}>HYDRA OPERATOR</Text>
        <Text style={{ color: "#d7fff2", marginTop: 8 }}>Connected: {bridgeState?.connected ? "YES" : "NO"}</Text>
      </View>

      <View style={{ borderWidth: 1, borderColor: "#1e4a3d", borderRadius: 16, padding: 16 }}>
        <Text style={{ color: "#8dffdc", fontWeight: "800", marginBottom: 10 }}>ACTIONS</Text>
        {ACTIONS.map(action => (
          <Pressable
            key={action}
            onPress={() => onAction?.(action)}
            style={{ borderWidth: 1, borderColor: "#2a6656", borderRadius: 12, padding: 12, marginBottom: 10 }}
          >
            <Text style={{ color: "#d7fff2", fontWeight: "700" }}>{action}</Text>
          </Pressable>
        ))}
      </View>

      <View style={{ borderWidth: 1, borderColor: "#1e4a3d", borderRadius: 16, padding: 16 }}>
        <Text style={{ color: "#8dffdc", fontWeight: "800" }}>LAST RESULT</Text>
        <Text style={{ color: "#d7fff2", marginTop: 8 }}>{result ? JSON.stringify(result) : "Brak"}</Text>
      </View>
    </ScrollView>
  );
}
