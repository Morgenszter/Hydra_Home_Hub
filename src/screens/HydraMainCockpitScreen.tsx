import React from "react";
import { ScrollView, Text, View } from "react-native";
import { HydraGlassPanel } from "../components/HydraGlassPanel";

type Props = {
  bridgeState: any;
};

export default function HydraMainCockpitScreen({ bridgeState }: Props) {
  const snapshot = bridgeState?.runtimeSnapshot;
  const voice = snapshot?.voice_state ?? {};
  const recentEvents = bridgeState?.recentEvents ?? [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#020605" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <View style={{ borderWidth: 1, borderColor: "#1e4a3d", borderRadius: 16, padding: 16 }}>
        <Text style={{ color: "#8dffdc", fontSize: 22, fontWeight: "800" }}>HYDRA COCKPIT</Text>
        <Text style={{ color: "#d7fff2", marginTop: 8 }}>Połączenie: {bridgeState?.connected ? "ONLINE" : "OFFLINE"}</Text>
        <Text style={{ color: "#d7fff2" }}>Stale: {bridgeState?.isStale ? "TAK" : "NIE"}</Text>
      </View>

      <View style={{ borderWidth: 1, borderColor: "#1e4a3d", borderRadius: 16, padding: 16 }}>
        <Text style={{ color: "#8dffdc", fontWeight: "800" }}>VOICE STATUS</Text>
        <Text style={{ color: "#d7fff2", marginTop: 8 }}>State: {voice.voiceState ?? "idle"}</Text>
        <Text style={{ color: "#d7fff2" }}>Last transcript: {voice.lastTranscript ?? "—"}</Text>
      </View>

      <View style={{ borderWidth: 1, borderColor: "#1e4a3d", borderRadius: 16, padding: 16 }}>
        <Text style={{ color: "#8dffdc", fontWeight: "800" }}>RECENT EVENTS</Text>
        {recentEvents.length === 0 ? (
          <Text style={{ color: "#d7fff2", marginTop: 8 }}>Brak zdarzeń</Text>
        ) : recentEvents.slice(0, 10).map((event: any, idx: number) => (
          <Text key={idx} style={{ color: "#d7fff2", marginTop: 6 }}>
            {event.type ?? "EVENT"} — {JSON.stringify(event.payload ?? {})}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
