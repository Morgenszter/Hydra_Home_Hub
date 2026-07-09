export type LogLevel =
  | "INFO"
  | "WARN"
  | "ERROR"
  | "DEBUG";


export interface LogEntry {
  id: string;
  level: LogLevel;
  message: string;
  timestamp: string;
}