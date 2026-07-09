import Device from "../Device";

import {

  DeviceInfo,

  DeviceState

} from "../DeviceTypes";

export default class LotusDevice extends Device {

  constructor(
    info: DeviceInfo
  ) {

    super(info);

  }

  async connect() {

    this.setState(
      DeviceState.CONNECTING
    );

    // BLE CONNECT

    this.setState(
      DeviceState.ONLINE
    );

  }

  async disconnect() {

    this.setState(
      DeviceState.OFFLINE
    );

  }

  async vibrate(
    intensity:number
  ){

    console.log(
      "Lotus intensity",
      intensity
    );

  }

  async stopVibration(){

    console.log(
      "Lotus stop"
    );

  }

  async battery(){

    return this.info.battery ?? 0;

  }

}