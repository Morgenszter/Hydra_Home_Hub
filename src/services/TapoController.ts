import Logger from "../core/Logger";

export interface TapoDevice {

  id: string;

  ip: string;

  name: string;

  online: boolean;

}

class TapoController {

  private devices =
    new Map<string, TapoDevice>();

  async discover() {

    Logger.info(
      "TAPO",
      "Starting discovery"
    );

    return this.getDevices();

  }

  register(
    device: TapoDevice
  ) {

    this.devices.set(
      device.id,
      device
    );

    Logger.info(
      "TAPO",
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
      "TAPO",
      `${device.name} -> ${
        state ? "ON" : "OFF"
      }`
    );

    return true;

  }

  async brightness(
    id: string,
    value: number
  ) {

    const device =
      this.devices.get(id);

    if (!device) {

      return false;

    }

    Logger.info(
      "TAPO",
      `${device.name} brightness ${value}`
    );

    return true;

  }

  async color(
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
      "TAPO",
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

const tapoController =
  new TapoController();

export default tapoController;