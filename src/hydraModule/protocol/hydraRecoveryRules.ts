import {
  HydraRecoveryPlan,
  HydraRecoveryStep,
  HydraSessionMode,
} from "./hydraSessionState";
import { HydraEvent } from "../../types/hydraProtocol";

export type HydraRecoveryInstruction = {
  action: string;
  message: string;
  recommendedDelayMs: number;
};

export function buildRecoveryPlan(mode: HydraSessionMode, event: HydraEvent): HydraRecoveryPlan {
  const now = Date.now();

  if (event.type === "DEVICE_OFFLINE") {
    return createPlan("device_offline", ["ping_bridge", "refresh_registry", "probe_device", "notify_operator"], 3, now);
  }

  if (event.type === "COMMAND_FAILED") {
    return createPlan("command_failed", ["retry_command", "cooldown", "refresh_registry"], 2, now);
  }

  if (event.type === "SCENE_FAILED" || event.type === "SCENE_STEP_FAILED") {
    return createPlan("scene_failed", ["notify_operator", "refresh_registry", "cooldown"], 1, now);
  }

  if (event.type === "DEVICE_ONLINE") {
    return createPlan("device_online_recovery", ["refresh_registry", "ping_bridge"], 1, now);
  }

  if (mode === "RECOVERY") {
    return createPlan("manual_recovery", ["ping_bridge", "refresh_registry"], 2, now);
  }

  return {
    active: false,
    reason: "none",
    steps: [],
    currentStepIndex: 0,
    startedAt: null,
    retryBudget: 0,
  };
}

export function getHydraRecoveryInstruction(plan: HydraRecoveryPlan): HydraRecoveryInstruction {
  if (!plan.active || plan.steps.length === 0) {
    return {
      action: "none",
      message: "Brak aktywnej procedury odzyskiwania.",
      recommendedDelayMs: 0,
    };
  }

  const current = plan.steps[plan.currentStepIndex] ?? plan.steps[0];

  switch (current) {
    case "ping_bridge":
      return {
        action: current,
        message: "Sprawdź łączność z HYDRA Bridge.",
        recommendedDelayMs: 1500,
      };
    case "refresh_registry":
      return {
        action: current,
        message: "Odśwież rejestr urządzeń.",
        recommendedDelayMs: 1000,
      };
    case "probe_device":
      return {
        action: current,
        message: "Sprawdź dostępność wskazanego urządzenia.",
        recommendedDelayMs: 2000,
      };
    case "retry_command":
      return {
        action: current,
        message: "Możliwa ponowna próba ostatniego rozkazu.",
        recommendedDelayMs: 2500,
      };
    case "notify_operator":
      return {
        action: current,
        message: "Powiadom operatora HYDRA.",
        recommendedDelayMs: 500,
      };
    case "cooldown":
      return {
        action: current,
        message: "Wstrzymanie przed kolejną próbą.",
        recommendedDelayMs: 3000,
      };
    default:
      return {
        action: "none",
        message: "Brak aktywnej procedury odzyskiwania.",
        recommendedDelayMs: 0,
      };
  }
}

function createPlan(reason: string, steps: HydraRecoveryStep[], retryBudget: number, now: number): HydraRecoveryPlan {
  return {
    active: true,
    reason,
    steps,
    currentStepIndex: 0,
    startedAt: now,
    retryBudget,
  };
}
