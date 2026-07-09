import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import {
  HydraRecoveryPlan,
  HydraSessionMode,
  HydraSessionState,
} from "../../hydraModule/protocol/hydraSessionState";
import { HydraRecoveryInstruction } from "../../hydraModule/protocol/hydraRecoveryRules";

export type HydraSessionPanelProps = {
  state: HydraSessionState;
  recovery: HydraRecoveryInstruction;
  onForceMode?: (mode: HydraSessionMode) => void;
  onAdvanceRecovery?: () => void;
};

const QUICK_MODES: HydraSessionMode[] = ["IDLE", "SCENE", "ALERT", "OFFLINE", "RECOVERY"];

export function HydraSessionPanel({ state, recovery, onForceMode, onAdvanceRecovery }: HydraSessionPanelProps) {
  return (
    <View style={[styles.panel, state.mode === "ALERT" || state.mode === "OFFLINE" ? styles.panelCritical : null]}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>SESSION ORCHESTRATOR</Text>
        <Text style={styles.mode}>{state.mode}</Text>
      </View>

      <Text style={styles.message}>{state.lastMessage}</Text>

      <View style={styles.grid}>
        <Metric label="THEME" value={`${state.themeMode.toUpperCase()}${state.themeLocked ? " LOCK" : ""}`} />
        <Metric label="VOICE" value={String(state.voicePriority)} />
        <Metric label="DEVICE" value={`${state.deviceFocus.deviceType.toUpperCase()} / ${state.deviceFocus.primaryDeviceId ?? "NONE"}`} />
        <Metric label="COMMAND" value={state.commandState.status ?? "NONE"} />
        <Metric label="SCENE" value={`${state.sceneState.phase ?? "NONE"} / ${state.sceneState.sceneId ?? "NONE"}`} />
        <Metric label="ALERT" value={`${state.alertState.level.toUpperCase()} / ${state.alertState.active ? "ACTIVE" : "CLEAR"}`} />
      </View>

      {state.hudGate.showCriticalBanner ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>TRYB KRYTYCZNY — OGRANICZENIA HUD AKTYWNE</Text>
        </View>
      ) : null}

      <RecoveryPlanView plan={state.recoveryPlan} recovery={recovery} onAdvanceRecovery={onAdvanceRecovery} />

      <View style={styles.modeRow}>
        {QUICK_MODES.map((mode) => (
          <Pressable key={mode} style={styles.button} onPress={() => onForceMode?.(mode)}>
            <Text style={styles.buttonText}>{mode}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function RecoveryPlanView({
  plan,
  recovery,
  onAdvanceRecovery,
}: {
  plan: HydraRecoveryPlan;
  recovery: HydraRecoveryInstruction;
  onAdvanceRecovery?: () => void;
}) {
  return (
    <View style={styles.recoveryBox}>
      <Text style={styles.recoveryTitle}>RECOVERY PLAN: {plan.active ? plan.reason.toUpperCase() : "NONE"}</Text>
      <Text style={styles.recovery}>{recovery.message}</Text>
      <Text style={styles.recoveryMeta}>
        STEP {plan.active ? plan.currentStepIndex + 1 : 0}/{plan.steps.length} • RETRY {plan.retryBudget}
      </Text>
      {plan.active ? (
        <Pressable style={styles.recoveryButton} onPress={onAdvanceRecovery}>
          <Text style={styles.recoveryButtonText}>NASTĘPNY KROK RECOVERY</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderWidth: 1,
    borderColor: "rgba(141,255,220,0.34)",
    borderRadius: 18,
    padding: 14,
    backgroundColor: "rgba(0,18,16,0.68)",
    gap: 10,
  },
  panelCritical: {
    borderColor: "rgba(255,77,109,0.7)",
    backgroundColor: "rgba(40,3,10,0.82)",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#8dffdc",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  mode: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.2,
  },
  message: {
    color: "#eafff8",
    fontSize: 13,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  metric: {
    minWidth: "46%",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 8,
  },
  metricLabel: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 10,
    fontWeight: "800",
  },
  metricValue: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "900",
  },
  banner: {
    borderWidth: 1,
    borderColor: "rgba(255,77,109,0.65)",
    backgroundColor: "rgba(255,77,109,0.12)",
    borderRadius: 12,
    padding: 10,
  },
  bannerText: {
    color: "#ff8fab",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  recoveryBox: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    borderRadius: 12,
    padding: 10,
    gap: 5,
  },
  recoveryTitle: {
    color: "#ffd166",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },
  recovery: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
  },
  recoveryMeta: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "800",
  },
  recoveryButton: {
    borderWidth: 1,
    borderColor: "rgba(255,209,102,0.4)",
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: "center",
  },
  recoveryButtonText: {
    color: "#ffd166",
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  modeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  button: {
    borderWidth: 1,
    borderColor: "rgba(141,255,220,0.26)",
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 9,
  },
  buttonText: {
    color: "#8dffdc",
    fontSize: 10,
    fontWeight: "900",
  },
});
