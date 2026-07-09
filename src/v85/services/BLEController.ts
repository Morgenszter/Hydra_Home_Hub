import { BleManager, Device } from "react-native-ble-plx";

class BLEController {

  private manager = new BleManager();

  private connected: Device | null = null;

  async scan(
    onDevice?: (device: Device) => void
  ): Promise<void> {

    this.manager.startDeviceScan(

      null,

      null,

      (error, device) => {

        if (error) {

          console.error(error);

          return;

        }

        if (device) {

          onDevice?.(device);

        }

      }

    );

  }

  stopScan(): void {

    this.manager.stopDeviceScan();

  }

  async connect(
    id: string
  ): Promise<Device> {

    this.connected =
      await this.manager.connectToDevice(id);

    await this.connected.discoverAllServicesAndCharacteristics();

    return this.connected;

  }

  async disconnect(): Promise<void> {

    if (!this.connected) {

      return;

    }

    await this.connected.cancelConnection();

    this.connected = null;

  }

  device(): Device | null {

    return this.connected;

  }

  connectedState(): boolean {

    return this.connected !== null;

  }

}

const bleController = new BLEController();

export default bleController;