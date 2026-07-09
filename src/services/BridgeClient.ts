import Logger from "../core/Logger";

export interface BridgeRequest {

  action: string;

  payload?: unknown;

}

export interface BridgeResponse<T = unknown> {

  success: boolean;

  data?: T;

  error?: string;

}

class BridgeClient {

  private host = "127.0.0.1";

  private port = 8080;

  private connected = false;

  setHost(
    host: string,
    port: number
  ) {

    this.host = host;

    this.port = port;

  }

  get url() {

    return `http://${this.host}:${this.port}`;

  }

  async connect() {

    this.connected = true;

    Logger.info(
      "BRIDGE",
      `Connected to ${this.url}`
    );

  }

  async disconnect() {

    this.connected = false;

    Logger.info(
      "BRIDGE",
      "Disconnected"
    );

  }

  async send<T = unknown>(
    request: BridgeRequest
  ): Promise<BridgeResponse<T>> {

    try {

      const response =
        await fetch(
          this.url,
          {
            method: "POST",

            headers: {

              "Content-Type":
                "application/json"

            },

            body: JSON.stringify(
              request
            )

          }
        );

      const data =
        await response.json();

      return {

        success: response.ok,

        data

      };

    } catch (error: any) {

      Logger.error(
        "BRIDGE",
        error?.message ??
          "Bridge error"
      );

      return {

        success: false,

        error:
          error?.message ??
          "Unknown error"

      };

    }

  }

  isConnected() {

    return this.connected;

  }

}

const bridgeClient =
  new BridgeClient();

export default bridgeClient;