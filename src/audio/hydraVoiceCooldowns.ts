export type HydraVoiceCooldownState = Record<string, number>;

export type HydraVoiceCooldownOptions = {
  now?: number;
  defaultCooldownMs?: number;
};

const CATEGORY_COOLDOWNS: Record<string, number> = {
  ack: 3500,
  command_completed: 2500,
  scene_started: 2500,
  scene_completed: 2500,
  warning: 5000,
  critical: 1200,
  offline: 6000,
  recovery: 4500,
  info: 3000,
};

export class HydraVoiceCooldowns {
  private lastPlayed: HydraVoiceCooldownState = {};

  canPlay(key: string, category: string, options: HydraVoiceCooldownOptions = {}) {
    const now = options.now ?? Date.now();
    const cooldown = CATEGORY_COOLDOWNS[category] ?? options.defaultCooldownMs ?? 3000;
    const last = this.lastPlayed[key] ?? 0;
    return now - last >= cooldown;
  }

  markPlayed(key: string, options: HydraVoiceCooldownOptions = {}) {
    this.lastPlayed[key] = options.now ?? Date.now();
  }

  reset() {
    this.lastPlayed = {};
  }

  snapshot() {
    return { ...this.lastPlayed };
  }
}

export function buildCooldownKey(category: string, deviceId?: string | null, sceneId?: string | null) {
  return [category, deviceId ?? "no-device", sceneId ?? "no-scene"].join(":");
}
