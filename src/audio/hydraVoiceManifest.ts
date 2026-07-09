export type HydraVoiceCue =
  | "acknowledged"
  | "completed"
  | "failed"
  | "offline"
  | "scene_completed";

export type HydraVoiceAsset = {
  id: string;
  cue: HydraVoiceCue;
  text: string;
  asset?: number;
};

export const hydraVoiceManifest: Record<HydraVoiceCue, HydraVoiceAsset[]> = {
  acknowledged: [
    { id: "ack_01", cue: "acknowledged", text: "Rozkaz przyjęty." },
    { id: "ack_02", cue: "acknowledged", text: "Potwierdzam." },
    { id: "ack_03", cue: "acknowledged", text: "Sekwencja rozpoczęta." },
    { id: "ack_04", cue: "acknowledged", text: "Przyjęto do wykonania." },
  ],
  completed: [
    { id: "done_01", cue: "completed", text: "Wykonano." },
    { id: "done_02", cue: "completed", text: "Operacja zakończona." },
    { id: "done_03", cue: "completed", text: "Cel osiągnięty." },
    { id: "done_04", cue: "completed", text: "Protokół zakończony." },
  ],
  failed: [
    { id: "fail_01", cue: "failed", text: "Błąd protokołu." },
    { id: "fail_02", cue: "failed", text: "Rozkaz nie został wykonany." },
    { id: "fail_03", cue: "failed", text: "Wystąpiła anomalia." },
    { id: "fail_04", cue: "failed", text: "Sekwencja przerwana." },
  ],
  offline: [
    { id: "off_01", cue: "offline", text: "Utracono kontakt z urządzeniem." },
    { id: "off_02", cue: "offline", text: "Sygnał urządzenia zanikł." },
    { id: "off_03", cue: "offline", text: "Jednostka niedostępna." },
    { id: "off_04", cue: "offline", text: "Łącze przerwane." },
  ],
  scene_completed: [
    { id: "scene_01", cue: "scene_completed", text: "Scena zakończona." },
    { id: "scene_02", cue: "scene_completed", text: "Układ taktyczny aktywny." },
    { id: "scene_03", cue: "scene_completed", text: "Konfiguracja sektora gotowa." },
    { id: "scene_04", cue: "scene_completed", text: "Scena wykonana." },
  ],
};

export function pickHydraVoiceAsset(cue: HydraVoiceCue): HydraVoiceAsset {
  const variants = hydraVoiceManifest[cue];
  return variants[Math.floor(Math.random() * variants.length)];
}
