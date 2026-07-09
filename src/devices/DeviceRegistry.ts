import Device from "./Device";

class DeviceRegistry {

  private devices =
    new Map<string, Device>();

  register(

    device: Device

  ) {

    this.devices.set(

      device.id,

      device

    );

  }

  unregister(

    id: string

  ) {

    this.devices.delete(id);

  }

  get(

    id: string

  ) {

    return this.devices.get(id);

  }

  getAll() {

    return Array.from(

      this.devices.values()

    );

  }

  has(

    id: string

  ) {

    return this.devices.has(id);

  }

  count() {

    return this.devices.size;

  }

  clear() {

    this.devices.clear();

  }

}

const registry =
  new DeviceRegistry();

export default registry;