import { useState } from "react";

import BridgeClient from "../services/BridgeClient";

export default function useBridge() {

  const [loading, setLoading] =
    useState(false);

  async function send(

    action: string,

    payload?: unknown

  ) {

    setLoading(true);

    try {

      return await BridgeClient.send({

        action,

        payload

      });

    } finally {

      setLoading(false);

    }

  }

  async function status() {

    return {

      connected:

        BridgeClient.isConnected(),

      url:

        BridgeClient.url

    };

  }

  return {

    loading,

    send,

    status

  };

}