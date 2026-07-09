export enum LogLevel {

  DEBUG = 0,

  INFO = 1,

  WARN = 2,

  ERROR = 3

}

export interface LogEntry {

  level: LogLevel;

  tag: string;

  message: string;

  timestamp: number;

  data?: unknown;

}

class Logger {

  private level = LogLevel.DEBUG;

  private history: LogEntry[] = [];

  setLevel(
    level: LogLevel
  ) {

    this.level = level;

  }

  private write(
    level: LogLevel,
    tag: string,
    message: string,
    data?: unknown
  ) {

    if (level < this.level) {

      return;

    }

    const entry: LogEntry = {

      level,

      tag,

      message,

      timestamp: Date.now(),

      data

    };

    this.history.push(entry);

    switch (level) {

      case LogLevel.DEBUG:

        console.log(
          `[DEBUG][${tag}]`,
          message,
          data ?? ""
        );

        break;

      case LogLevel.INFO:

        console.info(
          `[INFO][${tag}]`,
          message,
          data ?? ""
        );

        break;

      case LogLevel.WARN:

        console.warn(
          `[WARN][${tag}]`,
          message,
          data ?? ""
        );

        break;

      case LogLevel.ERROR:

        console.error(
          `[ERROR][${tag}]`,
          message,
          data ?? ""
        );

        break;

    }

  }

  debug(
    tag: string,
    message: string,
    data?: unknown
  ) {

    this.write(
      LogLevel.DEBUG,
      tag,
      message,
      data
    );

  }

  info(
    tag: string,
    message: string,
    data?: unknown
  ) {

    this.write(
      LogLevel.INFO,
      tag,
      message,
      data
    );

  }

  warn(
    tag: string,
    message: string,
    data?: unknown
  ) {

    this.write(
      LogLevel.WARN,
      tag,
      message,
      data
    );

  }

  error(
    tag: string,
    message: string,
    data?: unknown
  ) {

    this.write(
      LogLevel.ERROR,
      tag,
      message,
      data
    );

  }

  clear() {

    this.history = [];

  }

  getHistory() {

    return [...this.history];

  }

  exportJSON() {

    return JSON.stringify(
      this.history,
      null,
      2
    );

  }

}

const logger = new Logger();

export default logger;