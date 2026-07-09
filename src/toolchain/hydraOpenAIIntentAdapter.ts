import {
  HydraIntentParseRequest,
  HydraIntentParseResult,
} from "./hydraToolchainContracts";

export type HydraOpenAIIntentAdapterConfig = {
  enabled: boolean;
  endpoint?: string;
  apiKey?: string;
  timeoutMs?: number;
};

export class HydraOpenAIIntentAdapter {
  constructor(private readonly config: HydraOpenAIIntentAdapterConfig) {}

  async parseIntent(request: HydraIntentParseRequest): Promise<HydraIntentParseResult> {
    if (!this.config.enabled) {
      return this.localFallback(request);
    }

    if (!this.config.endpoint || !this.config.apiKey) {
      return {
        ok: false,
        intent: "unknown",
        confidence: 0,
        params: {},
        error: "OPENAI_ADAPTER_NOT_CONFIGURED",
      };
    }

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs ?? 3500);

      const response = await fetch(this.config.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: "intent-parser",
          locale: request.locale,
          source: request.source,
          text: request.text,
          context: request.context ?? {},
        }),
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        return this.localFallback(request, `HTTP_${response.status}`);
      }

      const raw = await response.json();
      return {
        ok: true,
        intent: String(raw.intent ?? "unknown"),
        target: raw.target ? String(raw.target) : undefined,
        confidence: Number(raw.confidence ?? 0.5),
        params: typeof raw.params === "object" && raw.params ? raw.params : {},
        raw,
      };
    } catch (error) {
      return this.localFallback(request, error instanceof Error ? error.message : "OPENAI_PARSE_FAILED");
    }
  }

  private localFallback(
    request: HydraIntentParseRequest,
    error?: string
  ): HydraIntentParseResult {
    const text = request.text.toLowerCase();

    if (text.includes("czerwony alert") || text.includes("red alert")) {
      return {
        ok: true,
        intent: "scene.red_alert",
        target: "red_alert",
        confidence: 0.74,
        params: { sourceText: request.text },
        error,
      };
    }

    if (text.includes("światło") || text.includes("lights")) {
      return {
        ok: true,
        intent: text.includes("wyłącz") || text.includes("off") ? "device.power_off" : "device.power_on",
        target: "lights",
        confidence: 0.68,
        params: { sourceText: request.text },
        error,
      };
    }

    return {
      ok: false,
      intent: "unknown",
      confidence: 0,
      params: { sourceText: request.text },
      error: error ?? "LOCAL_FALLBACK_NO_MATCH",
    };
  }
}
