import BLEProtocol from "../BLEProtocol";

import LotusCommand from "./LotusCommands";

import LotusState from "./LotusState";

import LotusEvents from "./LotusEvents";

import { Device } from "react-native-ble-plx";

class LotusController {

  private device: Device | null = null;

  attach(

    device: Device

  ) {

    this.device = device;

    LotusState.connected = true;

    LotusEvents.connected();

  }

  async disconnect() {

    this.device = null;

    LotusState.connected = false;

    LotusEvents.disconnected();

  }

  async ping() {

    if (!this.device) {

      return;

    }

    await BLEProtocol.write(

      this.device,

      LotusCommand.Ping

    );

  }

  async start() {

    if (!this.device) {

      return;

    }

    await BLEProtocol.write(

      this.device,

      LotusCommand.Start

    );

  }

  async stop() {

    if (!this.device) {

      return;

    }

    await BLEProtocol.write(

      this.device,

      LotusCommand.Stop

    );

  }

  async intensity(

    value:number

  ) {

    if (!this.device) {

      return;

    }

    LotusState.intensity = value;

    await BLEProtocol.write(

      this.device,

      LotusCommand.SetIntensity,

      [value]

    );

  }

  async mode(

    value:number

  ) {

    if (!this.device) {

      return;

    }

    LotusState.mode = value;

    await BLEProtocol.write(

      this.device,

      LotusCommand.SetMode,

      [value]

    );

  }

  state() {

    return LotusState;

  }

}

const lotus =
  new LotusController();

export default lotus;