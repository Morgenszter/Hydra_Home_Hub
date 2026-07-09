export enum HydraCommand {


  SYSTEM_START =
  "SYSTEM_START",


  SYSTEM_STOP =
  "SYSTEM_STOP",


  DEVICE_SCAN =
  "DEVICE_SCAN",


  DEVICE_ON =
  "DEVICE_ON",


  DEVICE_OFF =
  "DEVICE_OFF",


  TEMPERATURE_READ =
  "TEMPERATURE_READ",


  RADAR_SCAN =
  "RADAR_SCAN",


  VOICE_COMMAND =
  "VOICE_COMMAND"


}


export const COMMAND_LABELS = {


  SYSTEM_START:
  "Initialize Hydra Core",


  SYSTEM_STOP:
  "Shutdown Hydra",


  DEVICE_SCAN:
  "Scan Devices",


  DEVICE_ON:
  "Activate Device",


  DEVICE_OFF:
  "Deactivate Device",


  TEMPERATURE_READ:
  "Thermal Scan",


  RADAR_SCAN:
  "Radar Sweep",


  VOICE_COMMAND:
  "Voice Control"


};