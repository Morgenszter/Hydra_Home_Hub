import { HydraEvent } from "../../types/hydraProtocol";
import {
  HydraSessionState,
  initialHydraSessionState,
} from "./hydraSessionState";
import { HydraThemeMode } from "../../theme/hydraThemes";
import {
  buildSessionMessage,
  resolveAlertState,
  resolveCommandState,
  resolveDeviceFocus,
  resolveHudGate,
  resolveRecoveryPlan,
  resolveSceneState,
  resolveSessionMode,
  resolveThemeMode,
  resolveVoicePriority,
} from "./hydraProtocolPolicies";
import { getHydraRecoveryInstruction, HydraRecoveryInstruction } from "./hydraRecoveryRules";

export type HydraSessionTransition = {
  previous: HydraSessionState;
  next: HydraSessionState;
  event: HydraEvent;
  recovery: HydraRecoveryInstruction;
};

export class HydraSessionOrchestrator {
  private state: HydraSessionState = initialHydraSessionState;
  private transitions: HydraSessionTransition[] = [];
  private listeners: Array<(transition: HydraSessionTransition) => void> = [];

  onTransition(listener: (transition: HydraSessionTransition) => void) {
    this.listeners.push(listener);
    listener({
      previous: this.state,
      next: this.state,
      event: {
        eventId: "initial",
        type: "SYSTEM_READY",
        timestamp: Date.now(),
        source: "orchestrator",
        severity: "info",
        message: this.state.lastMessage,
      },
      recovery: getHydraRecoveryInstruction(this.state.recoveryPlan),
    });

    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  ingest(event: HydraEvent): HydraSessionTransition {
    const previous = this.state;
    const mode = resolveSessionMode(event, previous);
    const themeMode = resolveThemeMode(mode, event, previous);
    const voicePriority = resolveVoicePriority(mode, event);
    const hudGate = resolveHudGate(mode);
    const alertState = resolveAlertState(mode, event, previous);
    const sceneState = resolveSceneState(event, previous);
    const commandState = resolveCommandState(event, previous);
    const deviceFocus = resolveDeviceFocus(event, previous);
    const recoveryPlan = resolveRecoveryPlan(mode, event);

    const next: HydraSessionState = {
      ...previous,
      mode,
      previousMode: previous.mode,
      themeMode,
      voicePriority,
      hudGate,
      recoveryPlan,
      alertState,
      sceneState,
      commandState,
      deviceFocus,
      activeCommandId: event.commandId ?? commandState.commandId ?? previous.activeCommandId ?? null,
      activeDeviceId: event.deviceId ?? deviceFocus.primaryDeviceId ?? previous.activeDeviceId ?? null,
      activeSceneId: event.sceneId ?? sceneState.sceneId ?? previous.activeSceneId ?? null,
      lastMessage: buildSessionMessage(mode, event),
      updatedAt: Date.now(),
    };

    return this.commit(previous, next, event);
  }

  forceMode(mode: HydraSessionState["mode"], reason = "manual_override") {
    const previous = this.state;
    const event: HydraEvent = {
      eventId: `manual:${Date.now()}`,
      type: `SESSION_${mode}`,
      timestamp: Date.now(),
      source: "orchestrator",
      severity: mode === "ALERT" || mode === "OFFLINE" ? "warning" : "info",
      message: reason,
    };

    const next: HydraSessionState = {
      ...previous,
      previousMode: previous.mode,
      mode,
      themeMode: resolveThemeMode(mode, event, previous),
      hudGate: resolveHudGate(mode),
      recoveryPlan: resolveRecoveryPlan(mode, event),
      lastMessage: reason,
      updatedAt: Date.now(),
    };

    return this.commit(previous, next, event);
  }

  forceTheme(mode: HydraThemeMode, locked = true) {
    const previous = this.state;
    const event: HydraEvent = {
      eventId: `theme:${Date.now()}`,
      type: "THEME_OVERRIDE",
      timestamp: Date.now(),
      source: "orchestrator",
      severity: "info",
      message: `Theme override: ${mode}`,
    };

    const next: HydraSessionState = {
      ...previous,
      themeMode: mode,
      themeLocked: locked,
      lastMessage: `Motyw ustawiony: ${mode}`,
      updatedAt: Date.now(),
    };

    return this.commit(previous, next, event);
  }

  setThemeLocked(locked: boolean) {
    const previous = this.state;
    const event: HydraEvent = {
      eventId: `theme-lock:${Date.now()}`,
      type: "THEME_LOCK",
      timestamp: Date.now(),
      source: "orchestrator",
      severity: "info",
      message: locked ? "Theme locked." : "Theme unlocked.",
    };

    const next: HydraSessionState = {
      ...previous,
      themeLocked: locked,
      lastMessage: locked ? "Motyw zablokowany." : "Motyw odblokowany.",
      updatedAt: Date.now(),
    };

    return this.commit(previous, next, event);
  }

  advanceRecoveryStep() {
    const previous = this.state;
    const plan = previous.recoveryPlan;
    const nextIndex = Math.min(plan.steps.length - 1, plan.currentStepIndex + 1);
    const nextPlan = {
      ...plan,
      currentStepIndex: nextIndex,
      active: nextIndex < plan.steps.length,
    };

    const event: HydraEvent = {
      eventId: `recovery:${Date.now()}`,
      type: "RECOVERY_ADVANCE",
      timestamp: Date.now(),
      source: "orchestrator",
      severity: "info",
      message: "Recovery step advanced.",
    };

    const next = {
      ...previous,
      recoveryPlan: nextPlan,
      updatedAt: Date.now(),
    };

    return this.commit(previous, next, event);
  }

  snapshot() {
    return this.state;
  }

  history() {
    return this.transitions;
  }

  clearHistory() {
    this.transitions = [];
  }

  private commit(previous: HydraSessionState, next: HydraSessionState, event: HydraEvent) {
    this.state = next;

    const transition: HydraSessionTransition = {
      previous,
      next,
      event,
      recovery: getHydraRecoveryInstruction(next.recoveryPlan),
    };

    this.transitions = [...this.transitions.slice(-199), transition];

    for (const listener of this.listeners) {
      listener(transition);
    }

    return transition;
  }
}
