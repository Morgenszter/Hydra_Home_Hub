import Logger from "../core/Logger";

const TAG = "HOOK";

export default function useLogger() {

  function info(
    message: string
  ) {

    Logger.info(
      TAG,
      message
    );

  }

  function warn(
    message: string
  ) {

    Logger.warn(
      TAG,
      message
    );

  }

  function error(
    message: string
  ) {

    Logger.error(
      TAG,
      message
    );

  }

  function getLogs() {

    if (
      typeof (Logger as any).getHistory === "function"
    ) {

      return (Logger as any).getHistory();

    }

    return [];

  }

  return {

    info,

    warn,

    error,

    getLogs

  };

}