

export {};

// HYDRA_COMPAT_LOGGER_EXPORTS
export type HydraLogLevel = "debug" | "info" | "warning" | "error";

export class Logger {
  entries: Array<{ level: HydraLogLevel; message: string; timestamp: number }> = [];

  log(level: HydraLogLevel, message: string) {
    const entry = { level, message, timestamp: Date.now() };
    this.entries.push(entry);
    return entry;
  }

  info(message: string) {
    return this.log("info", message);
  }

  warning(message: string) {
    return this.log("warning", message);
  }

  error(message: string) {
    return this.log("error", message);
  }
}

export default Logger;
