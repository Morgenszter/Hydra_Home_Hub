import { Device } from "react-native-ble-plx";

import Logger from "../core/Logger";

import BLEScanner from "./BLEScanner";

import DeviceRegistry from "../devices/DeviceRegistry";

import LotusDevice from "../devices/lotus/LotusDevice";

import {

  DeviceInfo,

  DeviceState,

  DeviceType

} from "../devices/DeviceTypes";

class DeviceDiscovery {

  private discovering = false;

  async start() {

    if (this.discovering) {

      return;

    }

    this.discovering = true;

    Logger.info(

      "DISCOVERY",

      "Starting discovery"

    );

    BLEScanner.start();

  }

  stop() {

    if (!this.discovering) {

      return;

    }

    BLEScanner.stop();

    this.discovering = false;

    Logger.info(

      "DISCOVERY",

      "Discovery stopped"

    );

  }

  registerBLE(

    device: Device

  ) {

    const info: DeviceInfo = {

      id: device.id,

      name:

        device.name ??

        "Unknown BLE Device",

      type: DeviceType.BLE,

      state: DeviceState.ONLINE,

      rssi:

        device.rssi ?? undefined

    };

    if (

      !DeviceRegistry.has(

        info.id

      )

    ) {

      DeviceRegistry.register(

        new LotusDevice(info)

      );

      Logger.info(

        "DISCOVERY",

        `Registered ${info.name}`

      );

    }

  }

  devices() {

    return DeviceRegistry.getAll();

  }

  count() {

    return DeviceRegistry.count();

  }

  clear() {

    DeviceRegistry.clear();

  }

  isDiscovering() {

    return this.discovering;

  }

}

const discovery =
  new DeviceDiscovery();

export default discovery;