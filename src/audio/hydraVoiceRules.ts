import { HydraEvent } from "../types/hydraProtocol";
import { HydraSessionState } from "../hydraModule/protocol/hydraSessionState";
import { HydraVoiceCatalogEntry, HydraVoiceCategory, hydraVoiceCatalog } from "./hydraVoiceCatalog";

export function selectVoiceCatalogEntry(
  category: HydraVoiceCategory,
  event: HydraEvent,
  session: HydraSessionState,
): HydraVoiceCatalogEntry | null {
  const deviceType = session.deviceFocus.deviceType;
  const sceneId = event.sceneId ?? session.sceneState.sceneId ?? null;

  const candidates = hydraVoiceCatalog.filter((entry) => {
    if (entry.category !== category) return false;

    const deviceMatches =
      !entry.deviceType ||
      entry.deviceType === "any" ||
      entry.deviceType === deviceType;

    const sceneMatches =
      !entry.sceneId ||
      entry.sceneId === "any" ||
      entry.sceneId === sceneId;

    const modeMatches =
      !entry.mode ||
      entry.mode === "any" ||
      entry.mode === session.mode;

    return deviceMatches && sceneMatches && modeMatches;
  });

  if (candidates.length === 0) {
    return fallbackEntry(category);
  }

  const specific = candidates.filter((entry) => entry.deviceType === deviceType || entry.sceneId === sceneId);
  const pool = specific.length > 0 ? specific : candidates;
  return pool[Math.floor(Math.random() * pool.length)] ?? null;
}

function fallbackEntry(category: HydraVoiceCategory): HydraVoiceCatalogEntry {
  return {
    id: `fallback_${category}`,
    category,
    text: fallbackText(category),
  };
}

function fallbackText(category: HydraVoiceCategory) {
  switch (category) {
    case "ack":
      return "Rozkaz przyjęty.";
    case "command_completed":
      return "Wykonano.";
    case "scene_started":
      return "Scena uruchomiona.";
    case "scene_completed":
      return "Scena zakończona.";
    case "offline":
      return "Utracono kontakt z jednostką.";
    case "critical":
      return "Błąd protokołu.";
    case "recovery":
      return "Stabilizacja systemu.";
    default:
      return "Zdarzenie systemowe HYDRA.";
  }
}
