import { useState } from "react";

import BLEController from "../services/BLEController";

export function useBLE() {

  const [devices, setDevices] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  async function scan() {

    setLoading(true);

    try {

      const found: any[] = [];

      await BLEController.scan(

        device => {

          found.push(device);

          setDevices([...found]);

        }

      );

      return found;

    } catch (error) {

      console.error(
        "[HYDRA BLE HOOK]",
        error
      );

      return [];

    } finally {

      setLoading(false);

    }

  }

  return {

    devices,

    loading,

    scan

  };

}

export default useBLE;