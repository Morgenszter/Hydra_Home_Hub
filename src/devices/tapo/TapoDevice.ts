import Device from "../Device";

import {

  DeviceInfo,

  DeviceState

} from "../DeviceTypes";

export default class TapoDevice extends Device {

  constructor(
    info: DeviceInfo
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

  async power(
    state:boolean
  ){

    console.log(
      "Tapo power",
      state
    );

  }

  async brightness(
    value:number
  ){

    console.log(
      value
    );

  }

  async color(
    hue:number,
    saturation:number
  ){

    console.log(
      hue,
      saturation
    );

  }

}