import bleController from "./BLEController";
import Logger from "../core/Logger";

import { Device } from "react-native-ble-plx";

class BLEScanner {

  private devices =
    new Map<string, Device>();

  private scanning = false;

  start() {

    if (this.scanning) {

      return;

    }

    this.scanning = true;

    this.devices.clear();

    Logger.info(
      "BLE",
      "Starting scan"
    );

    bleController.scan(

      device => {

        if (!device.id) {

          return;

        }

        if (this.devices.has(device.id)) {

          return;

        }

        this.devices.set(
          device.id,
          device
        );

        Logger.debug(
          "BLE",
          "Found device",
          device
        );

      }

    );

  }

  stop() {

    if (!this.scanning) {

      return;

    }

    bleController.stopScan();

    this.scanning = false;

    Logger.info(
      "BLE",
      "Scan stopped"
    );

  }

  clear() {

    this.devices.clear();

  }

  getDevices() {

    return Array.from(
      this.devices.values()
    );

  }

  getDevice(
    id:string
  ){

    return this.devices.get(id);

  }

  count(){

    return this.devices.size;

  }

  scanningState(){

    return this.scanning;

  }

}

const bleScanner =
  new BLEScanner();

export default bleScanner;