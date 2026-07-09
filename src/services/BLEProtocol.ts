import { Device } from "react-native-ble-plx";

import Logger from "../core/Logger";

import BLEParser from "./BLEParser";

export const LOTUS_SERVICE_UUID =
  "0000FFF0-0000-1000-8000-00805F9B34FB";

export const LOTUS_WRITE_UUID =
  "0000FFF2-0000-1000-8000-00805F9B34FB";

export const LOTUS_NOTIFY_UUID =
  "0000FFF1-0000-1000-8000-00805F9B34FB";

class BLEProtocol {

  async write(

    device: Device,

    command: number,

    payload: number[] = []

  ) {

    const packet =
      BLEParser.encode(

        command,

        payload

      );

    const value =
      Buffer.from(packet).toString(
        "base64"
      );

    Logger.debug(

      "BLE",

      "WRITE",

      packet

    );

    await device.writeCharacteristicWithResponseForService(

      LOTUS_SERVICE_UUID,

      LOTUS_WRITE_UUID,

      value

    );

  }

  async monitor(

    device: Device,

    callback: (

      command: number,

      payload: Uint8Array

    ) => void

  ) {

    device.monitorCharacteristicForService(

      LOTUS_SERVICE_UUID,

      LOTUS_NOTIFY_UUID,

      (error, characteristic) => {

        if (error) {

          Logger.error(

            "BLE",

            "Monitor error",

            error

          );

          return;

        }

        if (

          !characteristic?.value

        ) {

          return;

        }

        const bytes =
          Uint8Array.from(

            Buffer.from(

              characteristic.value,

              "base64"

            )

          );

        const packet =
          BLEParser.parse(

            bytes

          );

        callback(

          packet.command,

          packet.payload

        );

      }

    );

  }

}

const protocol =
  new BLEProtocol();

export default protocol;