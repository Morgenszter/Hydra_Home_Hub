import Logger from "../core/Logger";

export interface TuyaDevice {

  id: string;

  ip: string;

  name: string;

  online: boolean;

}

class TuyaController {

  private devices =
    new Map<string, TuyaDevice>();

  async discover() {

    Logger.info(
      "TUYA",
      "Starting discovery"
    );

    return this.getDevices();

  }

  register(
    device: TuyaDevice
  ) {

    this.devices.set(
      device.id,
      device
    );

    Logger.info(
      "TUYA",
      `Registered ${device.name}`
    );

  }

  remove(
    id: string
  ) {

    this.devices.delete(id);

  }

  async power(
    id: string,
    state: boolean
  ) {

    const device =
      this.devices.get(id);

    if (!device) {

      return false;

    }

    Logger.info(
      "TUYA",
      `${device.name} -> ${
        state ? "ON" : "OFF"
      }`
    );

    return true;

  }

  async setBrightness(
    id: string,
    value: number
  ) {

    const device =
      this.devices.get(id);

    if (!device) {

      return false;

    }

    Logger.info(
      "TUYA",
      `${device.name} brightness ${value}`
    );

    return true;

  }

  async setColor(
    id: string,
    hue: number,
    saturation: number
  ) {

    const device =
      this.devices.get(id);

    if (!device) {

      return false;

    }

    Logger.info(
      "TUYA",
      `${device.name} H:${hue} S:${saturation}`
    );

    return true;

  }

  getDevice(
    id: string
  ) {

    return this.devices.get(id);

  }

  getDevices() {

    return Array.from(
      this.devices.values()
    );

  }

  count() {

    return this.devices.size;

  }

  clear() {

    this.devices.clear();

  }

}

const tuyaController =
  new TuyaController();

export default tuyaController;