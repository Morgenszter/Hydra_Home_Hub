import React from "react";
import { ScrollView, Text } from "react-native";
import { HydraGlassPanel } from "../components/HydraGlassPanel";

type Props = { bridgeState?: any };

export default function HydraV85AlphaDashboardScreen({ bridgeState }: Props) {
  const snapshot = bridgeState?.runtimeSnapshot ?? {};
  const voice = snapshot?.voice_state ?? bridgeState?.voicePatch ?? {};
  const events = bridgeState?.recentEvents ?? [];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#010403" }} contentContainerStyle={{ padding: 16, gap: 14 }}>
      <HydraGlassPanel>
        <Text style={{ color: "#8dffdc", fontSize: 26, fontWeight: "900", letterSpacing: 2 }}>
          HYDRA V85 ALPHA
        </Text>
        <Text style={{ color: "#d7fff2", marginTop: 8 }}>Alpha dashboard mode active</Text>
        <Text style={{ color: "#d7fff2", marginTop: 6 }}>
          Bridge: {bridgeState?.connected ? "ONLINE" : "OFFLINE"}
        </Text>
      </HydraGlassPanel>

      <HydraGlassPanel>
        <Text style={{ color: "#8dffdc", fontWeight: "900" }}>VOICE CORE</Text>
        <Text style={{ color: "#d7fff2", marginTop: 8 }}>State: {voice.voiceState ?? "idle"}</Text>
        <Text style={{ color: "#d7fff2" }}>Last transcript: {voice.lastTranscript ?? "—"}</Text>
      </HydraGlassPanel>

      <HydraGlassPanel>
        <Text style={{ color: "#8dffdc", fontWeight: "900" }}>DATA STREAM</Text>
        {events.length === 0 ? (
          <Text style={{ color: "#d7fff2", marginTop: 8 }}>No live events yet</Text>
        ) : (
          events.slice(0, 12).map((event: any, index: number) => (
            <Text key={index} style={{ color: "#d7fff2", marginTop: 6 }}>
              {event.type ?? "EVENT"} — {JSON.stringify(event.payload ?? {})}
            </Text>
          ))
        )}
      </HydraGlassPanel>
    </ScrollView>
  );
}
