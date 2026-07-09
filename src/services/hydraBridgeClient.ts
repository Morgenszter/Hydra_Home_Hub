import {
  HydraCommandRecord,
  HydraCommandRequest,
  HydraDevice,
  HydraEvent,
  HydraScene,
  HydraStatus,
} from "../types/hydraProtocol";
import { DEFAULT_HYDRA_BRIDGE_URL } from "../constants/hydraBridge";

export type HydraBridgeClientOptions = {
  baseUrl?: string;
  timeoutMs?: number;
};

export class HydraBridgeError extends Error {
  status?: number;
  payload?: unknown;

  constructor(message: string, status?: number, payload?: unknown) {
    super(message);
    this.name = "HydraBridgeError";
    this.status = status;
    this.payload = payload;
  }
}

export class HydraBridgeClient {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(options: HydraBridgeClientOptions = {}) {
    this.baseUrl = this.normalizeBaseUrl(options.baseUrl ?? DEFAULT_HYDRA_BRIDGE_URL);
    this.timeoutMs = options.timeoutMs ?? 8000;
  }

  setBaseUrl(baseUrl: string) {
    this.baseUrl = this.normalizeBaseUrl(baseUrl);
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  async health(): Promise<{ ok: boolean; system: string; version: string; mode: string }> {
    return this.request("/health");
  }

  async status(): Promise<HydraStatus> {
    return this.request("/status");
  }

  async devices(): Promise<HydraDevice[]> {
    return this.request("/devices");
  }

  async scenes(): Promise<HydraScene[]> {
    return this.request("/scenes");
  }

  async eventsHistory(limit = 100): Promise<HydraEvent[]> {
    return this.request(`/events/history?limit=${encodeURIComponent(String(limit))}`);
  }

  async commands(): Promise<HydraCommandRecord[]> {
    return this.request("/commands");
  }

  async command(commandId: string): Promise<HydraCommandRecord> {
    return this.request(`/commands/${encodeURIComponent(commandId)}`);
  }

  async sendDeviceCommand(deviceId: string, body: HydraCommandRequest): Promise<HydraCommandRecord> {
    return this.request(`/devices/${encodeURIComponent(deviceId)}/command`, {
      method: "POST",
      body: JSON.stringify({
        command: body.command,
        params: body.params ?? {},
      }),
    });
  }

  async runScene(sceneId: string): Promise<HydraCommandRecord> {
    return this.request(`/scenes/${encodeURIComponent(sceneId)}`, {
      method: "POST",
      body: JSON.stringify({}),
    });
  }

  createEventsStreamUrl() {
    return `${this.baseUrl}/events/stream`;
  }

  private async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        ...init,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          ...(init.headers ?? {}),
        },
        signal: controller.signal,
      });

      let payload: unknown = null;
      const text = await response.text();
      if (text) {
        try {
          payload = JSON.parse(text);
        } catch {
          payload = text;
        }
      }

      if (!response.ok) {
        throw new HydraBridgeError("HYDRA Bridge odrzucił żądanie.", response.status, payload);
      }

      return payload as T;
    } catch (error) {
      if (error instanceof HydraBridgeError) {
        throw error;
      }

      if (error instanceof Error && error.name === "AbortError") {
        throw new HydraBridgeError("Timeout połączenia z HYDRA Bridge.");
      }

      throw new HydraBridgeError(error instanceof Error ? error.message : "Nieznany błąd HYDRA Bridge.");
    } finally {
      clearTimeout(timeout);
    }
  }

  private normalizeBaseUrl(value: string) {
    return value.trim().replace(/\/+$/, "");
  }
}

export const hydraBridgeClient = new HydraBridgeClient();
