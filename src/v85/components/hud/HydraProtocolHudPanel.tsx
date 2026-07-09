import { HydraHudReactionPanel } from "./HydraHudReactionPanel";
import { useHydraHudReactions } from "../../hooks/useHydraHudReactions";
import { HydraBoundFramePanels } from "./HydraBoundFramePanels";
import { HydraFrameShowcasePanel } from "./HydraFrameShowcasePanel";
import { HydraAlphaLegionHudPanel } from "./HydraAlphaLegionHudPanel";
import { HydraExistingHudPatchReportPanel } from "./HydraExistingHudPatchReportPanel";
import { HydraV41ComponentPatchPanel } from "./HydraV41ComponentPatchPanel";
import { HydraRealHudBindingsPanel } from "./HydraRealHudBindingsPanel";
import { HydraDesignBindingsPanel } from "./HydraDesignBindingsPanel";
import { useHydraStatusFx } from "../../hooks/useHydraStatusFx";
import { useHydraConsoleFx } from "../../hooks/useHydraConsoleFx";
import { useHydraRadarFx } from "../../hooks/useHydraRadarFx";
import { useHydraHudFx } from "../../hooks/useHydraHudFx";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useHydraBridgeContext } from "../../context/HydraBridgeProvider";
import { useHydraAnimationEngine } from "../../hooks/useHydraAnimationEngine";
import { useHydraAudioQueueEngine } from "../../hooks/useHydraAudioQueueEngine";
import { useHydraVoicePersonality } from "../../hooks/useHydraVoicePersonality";
import { useHydraProtocolEngine } from "../../hooks/useHydraProtocolEngine";
import { useHydraSessionOrchestrator } from "../../hooks/useHydraSessionOrchestrator";
import { useHydraVisualFX } from "../../hooks/useHydraVisualFX";
import { hydraThemes } from "../../theme/hydraThemes";
import { HydraAnimationStatusPanel } from "./HydraAnimationStatusPanel";
import { HydraProtocolConsole } from "./HydraProtocolConsole";
import { HydraSessionPanel } from "./HydraSessionPanel";
import { HydraThemeControlPanel } from "./HydraThemeControlPanel";
import { HydraVisualOverlay } from "./HydraVisualOverlay";
import { HydraVoiceQueuePanel } from "./HydraVoiceQueuePanel";

export function HydraProtocolHudPanel() {
  const hydra = useHydraBridgeContext();
  const protocol = useHydraProtocolEngine(hydra.events);
  const session = useHydraSessionOrchestrator(hydra.events);
  const voice = useHydraVoicePersonality(hydra.events, session.state);
  const audio = useHydraAudioQueueEngine(voice.voiceLines);
  const animation = useHydraAnimationEngine(protocol.hudSignals);
  const palette = hydraThemes[session.state.themeMode];
  const visualFx = useHydraVisualFX(animation.state.current, session.state.themeMode);
  const hudReactions = useHydraHudReactions(hydra.events);
  const hudFx = useHydraHudFx(visualFx.state, session.state, palette);
  const radarFx = useHydraRadarFx(visualFx.state, session.state, palette);
  const consoleFx = useHydraConsoleFx(visualFx.state, session.state, palette);
  const statusFx = useHydraStatusFx(session.state, palette);
  const recovery = session.transitions[session.transitions.length - 1]?.recovery ?? {
    action: "none",
    message: "Brak aktywnej procedury odzyskiwania.",
    recommendedDelayMs: 0,
  };

  return (
    <View style={[styles.wrapper, { backgroundColor: palette.background }]}>
      <View style={[styles.statusBar, { borderColor: palette.border, backgroundColor: palette.panel }]}>
        <Text style={[styles.statusTitle, { color: palette.accent }]}>PROTOCOL ENGINE</Text>
        <Text style={[styles.statusValue, { color: palette.textSecondary }]}>
          {hydra.connectionState.toUpperCase()} • {hydra.devices.length} DEV • {hydra.events.length} EVT
        </Text>
      </View>

      <HydraSessionPanel
        state={session.state}
        recovery={recovery}
        onForceMode={session.forceMode}
        onAdvanceRecovery={session.advanceRecoveryStep}
      />

      <HydraThemeControlPanel
        mode={session.state.themeMode}
        locked={session.state.themeLocked}
        onModeChange={(mode) => session.forceTheme(mode, true)}
        onToggleLock={() => session.setThemeLocked(!session.state.themeLocked)}
      />

      <HydraVisualOverlay fx={visualFx.state} palette={palette} />

      <HydraDesignBindingsPanel
        hud={hudFx}
        radar={radarFx}
        consoleFx={consoleFx}
        status={statusFx}
      />

      <HydraRealHudBindingsPanel
        devices={hydra.devices}
        visualFx={visualFx.state}
        session={session.state}
        palette={palette}
        radarFx={radarFx}
        consoleFx={consoleFx}
        statusFx={statusFx}
      />

      <HydraV41ComponentPatchPanel
        devices={hydra.devices}
        visualFx={visualFx.state}
        session={session.state}
        palette={palette}
        radarFx={radarFx}
        consoleFx={consoleFx}
      />

      <HydraExistingHudPatchReportPanel discoveredFiles={["src/hooks/useHydraRadarFx.ts", "src/hooks/useHydraConsoleFx.ts", "src/hooks/useHydraDeviceTileFx.ts", "src/hydraModule/radar/RadarEngine.ts", "src/hydraModule/radar/RadarRenderer.ts", "src/hydraModule/components/hud/ConsoleLog.tsx", "src/hydraModule/components/hud/DeviceStatus.tsx", "src/hydraModule/components/hud/Radar.tsx", "src/hydraModule/components/hud/StatusPanel.tsx", "src/components/hud/ConsoleLog.tsx", "src/components/hud/DeviceStatus.tsx", "src/components/hud/Radar.tsx", "src/components/hud/StatusPanel.tsx", "src/components/hud/HydraProtocolConsole.tsx", "src/components/hud/HydraAnimationStatusPanel.tsx", "src/components/hud/BoundHydraStatusPanel.tsx", "src/components/hud/BoundHydraRadar.tsx", "src/components/hud/BoundHydraConsole.tsx", "src/components/hud/BoundHydraDeviceTile.tsx", "src/components/hud/HydraPatchedRadar.tsx"]} />

      <HydraProtocolConsole signals={protocol.hudSignals} />
      <HydraAnimationStatusPanel
        state={animation.state}
        onClear={animation.clear}
        onComplete={animation.completeCurrent}
      />
      <HydraVoiceQueuePanel
        current={audio.state.current}
        queuedCount={audio.state.queue.length}
        status={audio.state.status}
        muted={audio.state.muted}
        onCompleteCurrent={audio.completeCurrent}
        onToggleMuted={() => audio.setMuted(!audio.state.muted)}
        onClear={audio.clear}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    borderRadius: 18,
    padding: 10,
  },
  statusBar: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusTitle: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.3,
  },
  statusValue: {
    fontSize: 11,
    fontWeight: "700",
  },
});
