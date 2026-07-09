import { HydraBridgeClient } from "./hydraBridgeClient";
import { HYDRA_DEVICE_IDS, HYDRA_SCENE_IDS } from "../constants/hydraBridge";

export type HydraModuleCommand =
  | { type: "LOTUS_POWER"; on: boolean }
  | { type: "LOTUS_COLOR"; color: string; brightness?: number }
  | { type: "TAPO_POWER"; on: boolean }
  | { type: "TAPO_COLOR"; color: string; brightness?: number }
  | { type: "HEATER_POWER"; on: boolean }
  | { type: "HEATER_TEMPERATURE"; temperature: number }
  | { type: "SCENE_RED_ALERT" }
  | { type: "SCENE_NIGHT_OPS" }
  | { type: "SCENE_SECTOR_HEAT" };

export class HydraModuleBridgeFacade {
  constructor(private readonly client: HydraBridgeClient) {}

  execute(command: HydraModuleCommand) {
    switch (command.type) {
      case "LOTUS_POWER":
        return this.client.sendDeviceCommand(HYDRA_DEVICE_IDS.lotus, {
          command: "setPower",
          params: { on: command.on },
        });
      case "LOTUS_COLOR":
        return this.client.sendDeviceCommand(HYDRA_DEVICE_IDS.lotus, {
          command: "setColor",
          params: { color: command.color, brightness: command.brightness ?? 100 },
        });
      case "TAPO_POWER":
        return this.client.sendDeviceCommand(HYDRA_DEVICE_IDS.tapo, {
          command: "setPower",
          params: { on: command.on },
        });
      case "TAPO_COLOR":
        return this.client.sendDeviceCommand(HYDRA_DEVICE_IDS.tapo, {
          command: "setColor",
          params: { color: command.color, brightness: command.brightness ?? 100 },
        });
      case "HEATER_POWER":
        return this.client.sendDeviceCommand(HYDRA_DEVICE_IDS.heater, {
          command: "setPower",
          params: { on: command.on },
        });
      case "HEATER_TEMPERATURE":
        return this.client.sendDeviceCommand(HYDRA_DEVICE_IDS.heater, {
          command: "setTemperature",
          params: { temperature: command.temperature },
        });
      case "SCENE_RED_ALERT":
        return this.client.runScene(HYDRA_SCENE_IDS.redAlert);
      case "SCENE_NIGHT_OPS":
        return this.client.runScene(HYDRA_SCENE_IDS.nightOps);
      case "SCENE_SECTOR_HEAT":
        return this.client.runScene(HYDRA_SCENE_IDS.sectorHeat);
      default:
        return assertNever(command);
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`Nieobsługiwana komenda HYDRA Module: ${JSON.stringify(value)}`);
}
