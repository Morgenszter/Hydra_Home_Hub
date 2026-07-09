export type HydraExternalDeviceRecord = {
  id: string;
  name: string;
  kind: "lotus_ble" | "tapo" | "heater" | "udp" | "unknown";
  address?: string;
  enabled: boolean;
  metadata: Record<string, unknown>;
};

export type HydraExternalSceneRecord = {
  id: string;
  name: string;
  enabled: boolean;
  actions: Array<Record<string, unknown>>;
};

export interface HydraExternalDataAdapter {
  name: string;
  enabled: boolean;
  listDevices(): Promise<HydraExternalDeviceRecord[]>;
  listScenes(): Promise<HydraExternalSceneRecord[]>;
}

export class HydraDisabledExternalDataAdapter implements HydraExternalDataAdapter {
  readonly name = "disabled";
  readonly enabled = false;

  async listDevices(): Promise<HydraExternalDeviceRecord[]> {
    return [];
  }

  async listScenes(): Promise<HydraExternalSceneRecord[]> {
    return [];
  }
}

export class HydraAirtableAdapter implements HydraExternalDataAdapter {
  readonly name = "airtable";

  constructor(
    readonly enabled: boolean,
    private readonly baseUrl?: string,
    private readonly token?: string
  ) {}

  async listDevices(): Promise<HydraExternalDeviceRecord[]> {
    return this.fetchList<HydraExternalDeviceRecord>("devices");
  }

  async listScenes(): Promise<HydraExternalSceneRecord[]> {
    return this.fetchList<HydraExternalSceneRecord>("scenes");
  }

  private async fetchList<T>(table: string): Promise<T[]> {
    if (!this.enabled || !this.baseUrl || !this.token) return [];

    const response = await fetch(`${this.baseUrl.replace(/\/+$/, "")}/${table}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });

    if (!response.ok) return [];
    const json = await response.json();
    return Array.isArray(json.records) ? json.records.map((item: any) => item.fields ?? item) : [];
  }
}

export class HydraConvexAdapter implements HydraExternalDataAdapter {
  readonly name = "convex";

  constructor(readonly enabled: boolean, private readonly endpoint?: string) {}

  async listDevices(): Promise<HydraExternalDeviceRecord[]> {
    return this.call<HydraExternalDeviceRecord[]>("devices:list", []);
  }

  async listScenes(): Promise<HydraExternalSceneRecord[]> {
    return this.call<HydraExternalSceneRecord[]>("scenes:list", []);
  }

  private async call<T>(functionName: string, fallback: T): Promise<T> {
    if (!this.enabled || !this.endpoint) return fallback;

    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ function: functionName }),
    });

    if (!response.ok) return fallback;
    return await response.json();
  }
}
