import Device from "../Device";

import {

  DeviceInfo,

  DeviceState

} from "../DeviceTypes";

export default class HeaterDevice extends Device {

  constructor(
    info:DeviceInfo
  ){

    super(info);

  }

  async connect(){

    this.setState(
      DeviceState.ONLINE
    );

  }

  async disconnect(){

    this.setState(
      DeviceState.OFFLINE
    );

  }

  async setTemperature(
    temperature:number
  ){

    console.log(
      "Temperature",
      temperature
    );

  }

  async power(
    state:boolean
  ){

    console.log(
      state
    );

  }

}