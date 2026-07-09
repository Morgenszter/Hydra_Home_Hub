import {

  DeviceInfo,

  DeviceState,

  DeviceType

} from "./DeviceTypes";

export default abstract class Device {

  protected info: DeviceInfo;

  constructor(

    info: DeviceInfo

  ) {

    this.info = info;

  }

  get id() {

    return this.info.id;

  }

  get name() {

    return this.info.name;

  }

  get type() {

    return this.info.type;

  }

  get state() {

    return this.info.state;

  }

  setState(

    state: DeviceState

  ) {

    this.info.state = state;

  }

  getInfo() {

    return {

      ...this.info

    };

  }

  abstract connect(): Promise<void>;

  abstract disconnect(): Promise<void>;

}