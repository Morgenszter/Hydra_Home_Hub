import Device from "./Device";

import Registry from "./DeviceRegistry";

class DeviceManager {

  add(

    device: Device

  ) {

    Registry.register(

      device

    );

  }

  remove(

    id: string

  ) {

    Registry.unregister(

      id

    );

  }

  async connect(

    id: string

  ) {

    const device =
      Registry.get(id);

    if (!device) {

      return false;

    }

    await device.connect();

    return true;

  }

  async disconnect(

    id: string

  ) {

    const device =
      Registry.get(id);

    if (!device) {

      return false;

    }

    await device.disconnect();

    return true;

  }

  devices() {

    return Registry.getAll();

  }

}

const manager =
  new DeviceManager();

export default manager;