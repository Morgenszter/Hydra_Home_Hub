import { HydraHudSignal } from "../services/hydraHudEventBridge";

export type HydraAnimationKind =
  | "fade"
  | "glow"
  | "pulse"
  | "scanline"
  | "radar_sweep"
  | "boot"
  | "shutdown"
  | "red_alert";

export type HydraAnimationCommand = {
  id: string;
  kind: HydraAnimationKind;
  intensity: number;
  durationMs: number;
  message: string;
  sourceSignalId?: string;
  createdAt: number;
};

export function mapHudSignalToAnimation(signal: HydraHudSignal): HydraAnimationCommand {
  const base = {
    id: `${signal.id}:anim`,
    sourceSignalId: signal.id,
    message: signal.message,
    createdAt: Date.now(),
  };

  switch (signal.type) {
    case "success":
      return { ...base, kind: "pulse", intensity: 0.65, durationMs: 900 };
    case "warning":
      return { ...base, kind: "scanline", intensity: 0.75, durationMs: 1300 };
    case "error":
      return { ...base, kind: "red_alert", intensity: 1, durationMs: 1800 };
    case "scene_start":
      return { ...base, kind: "radar_sweep", intensity: 0.85, durationMs: 1600 };
    case "scene_done":
      return { ...base, kind: "glow", intensity: 0.9, durationMs: 1400 };
    case "device_update":
      return { ...base, kind: "fade", intensity: 0.45, durationMs: 700 };
    default:
      return { ...base, kind: "scanline", intensity: 0.3, durationMs: 600 };
  }
}
