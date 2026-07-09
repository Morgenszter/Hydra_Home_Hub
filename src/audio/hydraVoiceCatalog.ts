import { HydraDeviceType, HydraSessionMode } from "../hydraModule/protocol/hydraSessionState";

export type HydraVoiceCategory =
  | "ack"
  | "command_completed"
  | "scene_started"
  | "scene_completed"
  | "warning"
  | "critical"
  | "offline"
  | "recovery"
  | "info";

export type HydraVoiceCatalogEntry = {
  id: string;
  category: HydraVoiceCategory;
  text: string;
  deviceType?: HydraDeviceType | "any";
  sceneId?: string | "any";
  mode?: HydraSessionMode | "any";
  priority?: number;
};

export const hydraVoiceCatalog: HydraVoiceCatalogEntry[] = [
  { id: "ack_generic_01", category: "ack", text: "Rozkaz przyjęty.", deviceType: "any", mode: "COMMAND" },
  { id: "ack_generic_02", category: "ack", text: "Potwierdzam.", deviceType: "any", mode: "COMMAND" },
  { id: "ack_generic_03", category: "ack", text: "Sekwencja rozpoczęta.", deviceType: "any", mode: "COMMAND" },

  { id: "ack_lotus_01", category: "ack", text: "Sektor świetlny przyjął rozkaz.", deviceType: "lotus" },
  { id: "ack_tapo_01", category: "ack", text: "Oświetlenie taktyczne gotowe do zmiany.", deviceType: "tapo" },
  { id: "ack_heater_01", category: "ack", text: "Sektor termiczny przyjął komendę.", deviceType: "heater" },

  { id: "done_generic_01", category: "command_completed", text: "Wykonano.", deviceType: "any" },
  { id: "done_generic_02", category: "command_completed", text: "Operacja zakończona.", deviceType: "any" },
  { id: "done_lotus_01", category: "command_completed", text: "Sektor świetlny zaktualizowany.", deviceType: "lotus" },
  { id: "done_tapo_01", category: "command_completed", text: "Oświetlenie taktyczne zsynchronizowane.", deviceType: "tapo" },
  { id: "done_heater_01", category: "command_completed", text: "Sektor termiczny zaktualizowany.", deviceType: "heater" },

  { id: "scene_red_start_01", category: "scene_started", text: "Tryb alarmowy aktywowany.", sceneId: "red_alert", priority: 82 },
  { id: "scene_red_start_02", category: "scene_started", text: "Czerwony alert. Protokół bojowy rozpoczęty.", sceneId: "red_alert", priority: 84 },
  { id: "scene_night_start_01", category: "scene_started", text: "Night Ops aktywne. Tryb cichej pracy.", sceneId: "night_ops", priority: 72 },
  { id: "scene_heat_start_01", category: "scene_started", text: "Rozgrzewanie sektora rozpoczęte.", sceneId: "sector_heat", priority: 70 },
  { id: "scene_start_generic", category: "scene_started", text: "Scena operacyjna uruchomiona.", sceneId: "any" },

  { id: "scene_done_01", category: "scene_completed", text: "Scena zakończona.", sceneId: "any", priority: 76 },
  { id: "scene_done_02", category: "scene_completed", text: "Konfiguracja sektora gotowa.", sceneId: "any", priority: 78 },
  { id: "scene_red_done_01", category: "scene_completed", text: "Czerwony alert zakończony. System stabilny.", sceneId: "red_alert", priority: 82 },

  { id: "offline_01", category: "offline", text: "Utracono kontakt z jednostką.", deviceType: "any", priority: 96 },
  { id: "offline_02", category: "offline", text: "Sygnał urządzenia zanikł.", deviceType: "any", priority: 95 },
  { id: "offline_heater_01", category: "offline", text: "Utracono kontakt z sektorem termicznym.", deviceType: "heater", priority: 97 },
  { id: "offline_lotus_01", category: "offline", text: "Sektor świetlny nie odpowiada.", deviceType: "lotus", priority: 96 },
  { id: "offline_tapo_01", category: "offline", text: "Oświetlenie taktyczne utraciło łączność.", deviceType: "tapo", priority: 96 },

  { id: "critical_01", category: "critical", text: "Błąd protokołu.", priority: 92 },
  { id: "critical_02", category: "critical", text: "Sekwencja przerwana.", priority: 91 },
  { id: "critical_03", category: "critical", text: "Wystąpiła anomalia systemowa.", priority: 90 },

  { id: "recovery_01", category: "recovery", text: "Łączność przywrócona.", priority: 68 },
  { id: "recovery_02", category: "recovery", text: "Stabilizacja systemu.", priority: 66 },
  { id: "recovery_03", category: "recovery", text: "Jednostka ponownie dostępna.", priority: 67 },

  { id: "info_ready_01", category: "info", text: "HYDRA gotowa.", mode: "IDLE", priority: 20 },
];
