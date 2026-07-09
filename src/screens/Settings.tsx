import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { HydraBridgeSettingsPanel } from "../components/HydraBridgeSettingsPanel";

export default function Settings() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>USTAWIENIA HYDRA</Text>
        <HydraBridgeSettingsPanel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#020706",
  },
  container: {
    padding: 18,
    gap: 16,
  },
  title: {
    color: "#8dffdc",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
});
