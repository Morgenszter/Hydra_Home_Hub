import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { HydraEvent } from "../types/hydraProtocol";
import { HydraVoiceCooldowns, buildCooldownKey } from "./hydraVoiceCooldowns";
import { HydraVoiceCategory } from "./hydraVoiceCatalog";
import { resolveVoiceCategory, resolveVoicePriority, isInterruptingPriority } from "./hydraVoicePriority";
import { selectVoiceCatalogEntry } from "./hydraVoiceRules";
import { HydraQueuedVoiceLine } from "../services/hydraAudioEventBridge";

export type HydraVoiceIntent = {
  id: string;
  text: string;
  category: HydraVoiceCategory;
  priority: number;
  interruptible: boolean;
  cooldownKey: string;
  deviceId?: string | null;
  sceneId?: string | null;
  mode: string;
  eventId: string;
  createdAt: number;
};

export type HydraVoicePersonalityDecision =
  | { accepted: true; intent: HydraVoiceIntent; line: HydraQueuedVoiceLine; interruptCurrent: boolean }
  | { accepted: false; reason: "no_category" | "cooldown" | "suppressed"; eventId: string };

export class HydraVoicePersonalityEngine {
  private cooldowns = new HydraVoiceCooldowns();
  private history: HydraVoiceIntent[] = [];

  resolve(event: HydraEvent, session: HydraSessionState): HydraVoicePersonalityDecision {
    const category = resolveVoiceCategory(event, session);

    if (!category) {
      return { accepted: false, reason: "no_category", eventId: event.eventId };
    }

    const priority = resolveVoicePriority(category, event, session);
    const isLowPriority = priority < 50;

    if (session.hudGate.suppressLowPriorityAudio && isLowPriority) {
      return { accepted: false, reason: "suppressed", eventId: event.eventId };
    }

    const cooldownKey = buildCooldownKey(category, event.deviceId ?? session.deviceFocus.primaryDeviceId, event.sceneId ?? session.sceneState.sceneId);

    if (!isInterruptingPriority(priority) && !this.cooldowns.canPlay(cooldownKey, category)) {
      return { accepted: false, reason: "cooldown", eventId: event.eventId };
    }

    const entry = selectVoiceCatalogEntry(category, event, session);

    if (!entry) {
      return { accepted: false, reason: "no_category", eventId: event.eventId };
    }

    const intent: HydraVoiceIntent = {
      id: `${event.eventId}:${entry.id}`,
      text: entry.text,
      category,
      priority: entry.priority ?? priority,
      interruptible: !isInterruptingPriority(priority),
      cooldownKey,
      deviceId: event.deviceId ?? session.deviceFocus.primaryDeviceId ?? null,
      sceneId: event.sceneId ?? session.sceneState.sceneId ?? null,
      mode: session.mode,
      eventId: event.eventId,
      createdAt: Date.now(),
    };

    this.cooldowns.markPlayed(cooldownKey);
    this.history = [...this.history.slice(-199), intent];

    return {
      accepted: true,
      intent,
      interruptCurrent: isInterruptingPriority(intent.priority),
      line: {
        id: intent.id,
        cue: mapCategoryToCue(category),
        text: intent.text,
        eventId: event.eventId,
        createdAt: intent.createdAt,
      },
    };
  }

  getHistory() {
    return this.history;
  }

  resetCooldowns() {
    this.cooldowns.reset();
  }
}

function mapCategoryToCue(category: HydraVoiceCategory): HydraQueuedVoiceLine["cue"] {
  switch (category) {
    case "ack":
      return "acknowledged";
    case "command_completed":
      return "completed";
    case "scene_started":
      return "acknowledged";
    case "scene_completed":
      return "scene_completed";
    case "offline":
      return "offline";
    case "critical":
    case "warning":
      return "failed";
    case "recovery":
      return "completed";
    default:
      return "completed";
  }
}
