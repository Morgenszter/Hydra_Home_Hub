import { HYDRA_DEVICE_IDS, HYDRA_SCENE_IDS } from "../constants/hydraBridge";
import { HydraBridgeClient } from "./hydraBridgeClient";

export function createHydraDeviceActions(client: HydraBridgeClient) {
  return {
    lotusPower: (on: boolean) =>
      client.sendDeviceCommand(HYDRA_DEVICE_IDS.lotus, { command: "setPower", params: { on } }),

    lotusColor: (color: string, brightness = 100) =>
      client.sendDeviceCommand(HYDRA_DEVICE_IDS.lotus, { command: "setColor", params: { color, brightness } }),

    tapoPower: (on: boolean) =>
      client.sendDeviceCommand(HYDRA_DEVICE_IDS.tapo, { command: "setPower", params: { on } }),

    tapoColor: (color: string, brightness = 100) =>
      client.sendDeviceCommand(HYDRA_DEVICE_IDS.tapo, { command: "setColor", params: { color, brightness } }),

    heaterPower: (on: boolean) =>
      client.sendDeviceCommand(HYDRA_DEVICE_IDS.heater, { command: "setPower", params: { on } }),

    heaterTemperature: (temperature: number) =>
      client.sendDeviceCommand(HYDRA_DEVICE_IDS.heater, { command: "setTemperature", params: { temperature } }),

    redAlert: () => client.runScene(HYDRA_SCENE_IDS.redAlert),
    nightOps: () => client.runScene(HYDRA_SCENE_IDS.nightOps),
    sectorHeat: () => client.runScene(HYDRA_SCENE_IDS.sectorHeat),
  };
}
