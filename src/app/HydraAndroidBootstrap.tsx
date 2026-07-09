import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View } from "react-native";
import HydraMainCockpitScreen from "../screens/HydraMainCockpitScreen";
import HydraOperatorScreen from "../screens/HydraOperatorScreen";
import HydraV85AlphaDashboardShell from "../screens/HydraV85AlphaDashboardShell";
import LoadingScreen from "../screens/LoadingScreen";
import { useHydraRuntimeBridge } from "../hooks/useHydraRuntimeBridge";
import {
  HydraAndroidSettings,
  loadHydraAndroidSettings,
  saveHydraAndroidSettings,
} from "./hydraAndroidSettings";
import { HYDRA_ANDROID_CONFIG } from "../config/hydraAndroidConfig";

export default function HydraAndroidBootstrap() {
  const [booting, setBooting] = useState(true);
  const [settings, setSettings] = useState<HydraAndroidSettings>({
    bridgeWsUrl: HYDRA_ANDROID_CONFIG.defaultBridgeWsUrl,
    apiBaseUrl: HYDRA_ANDROID_CONFIG.defaultBridgeUrl,
    mode: "cockpit",
  });

  const { state, actions } = useHydraRuntimeBridge(settings.bridgeWsUrl);

  useEffect(() => {
    loadHydraAndroidSettings().then((loaded) => {
      setSettings(loaded);
      setTimeout(() => setBooting(false), HYDRA_ANDROID_CONFIG.bootDurationMs);
    });
  }, []);

  async function patch(patchValue: Partial<HydraAndroidSettings>) {
    const next = { ...settings, ...patchValue };
    setSettings(next);
    await saveHydraAndroidSettings(next);
  }

  async function runOperatorAction(action: string) {
    try {
      const response = await fetch(`${settings.apiBaseUrl.replace(/\/+$/, "")}/operator/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const payload = await response.json();
      console.log("HYDRA operator action result", payload);
    } catch (error) {
      console.log("HYDRA operator action error", String(error));
    }
  }

  if (booting) {
    return <LoadingScreen label="HYDRA INITIALIZING" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020605" }}>
      <View style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: "#16352c", gap: 10 }}>
        <Text style={{ color: "#8dffdc", fontSize: 20, fontWeight: "800" }}>HYDRA ANDROID</Text>
        <TextInput
          value={settings.bridgeWsUrl}
          onChangeText={(bridgeWsUrl) => patch({ bridgeWsUrl })}
          style={{ borderWidth: 1, borderColor: "#295a4d", borderRadius: 10, padding: 10, color: "#d7fff2" }}
          placeholder="ws://host:port/ws/runtime"
          placeholderTextColor="#8aaea3"
        />
        <TextInput
          value={settings.apiBaseUrl}
          onChangeText={(apiBaseUrl) => patch({ apiBaseUrl })}
          style={{ borderWidth: 1, borderColor: "#295a4d", borderRadius: 10, padding: 10, color: "#d7fff2" }}
          placeholder="http://host:port"
          placeholderTextColor="#8aaea3"
        />
        <View style={{ flexDirection: "row", gap: 10, flexWrap: "wrap" }}>
          <Pressable onPress={() => patch({ mode: "cockpit" })} style={{ padding: 10, borderWidth: 1, borderColor: "#295a4d", borderRadius: 10 }}><Text style={{ color: "#d7fff2" }}>Cockpit</Text></Pressable>
          <Pressable onPress={() => patch({ mode: "operator" })} style={{ padding: 10, borderWidth: 1, borderColor: "#295a4d", borderRadius: 10 }}><Text style={{ color: "#d7fff2" }}>Operator</Text></Pressable>
          <Pressable onPress={() => patch({ mode: "alpha" })} style={{ padding: 10, borderWidth: 1, borderColor: "#295a4d", borderRadius: 10 }}><Text style={{ color: "#d7fff2" }}>Alpha</Text></Pressable>
          <Pressable onPress={actions.reconnect} style={{ padding: 10, borderWidth: 1, borderColor: "#295a4d", borderRadius: 10 }}><Text style={{ color: "#d7fff2" }}>Reconnect</Text></Pressable>
        </View>
      </View>

      {settings.mode === "cockpit" ? (
        <HydraMainCockpitScreen bridgeState={state} />
      ) : settings.mode === "alpha" ? (
        <HydraV85AlphaDashboardShell bridgeState={state} />
      ) : (
        <HydraOperatorScreen bridgeState={state} onAction={runOperatorAction} />
      )}
    </SafeAreaView>
  );
}
