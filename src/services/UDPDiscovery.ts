import Logger from "../core/Logger";

export interface UDPDevice {

  id: string;

  name: string;

  ip: string;

  port: number;

  lastSeen: number;

}

class UDPDiscovery {

  private devices =
    new Map<string, UDPDevice>();

  private scanning = false;

  async start() {

    if (this.scanning) {

      return;

    }

    this.scanning = true;

    Logger.info(

      "UDP",

      "Discovery started"

    );

  }

  stop() {

    this.scanning = false;

    Logger.info(

      "UDP",

      "Discovery stopped"

    );

  }

  register(
    device: UDPDevice
  ) {

    this.devices.set(
      device.id,
      device
    );

    Logger.info(

      "UDP",

      `Found ${device.name}`

    );

  }

  update(
    id: string
  ) {

    const device =
      this.devices.get(id);

    if (!device) {

      return;

    }

    device.lastSeen =
      Date.now();

  }

  remove(
    id: string
  ) {

    this.devices.delete(id);

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

  clear() {

    this.devices.clear();

  }

  count() {

    return this.devices.size;

  }

  isScanning() {

    return this.scanning;

  }

}

const udpDiscovery =
  new UDPDiscovery();

export default udpDiscovery;