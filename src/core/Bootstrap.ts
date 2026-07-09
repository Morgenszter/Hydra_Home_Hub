import Logger from "./Logger";
import Registry from "./Registry";
import Container from "./ServiceContainer";

export default class Bootstrap {

  static async start() {

    Logger.info(

      "BOOT",

      "HYDRA boot sequence"

    );

    Logger.info(

      "BOOT",

      "Loading services"

    );

    Logger.info(

      "BOOT",

      `Registered modules: ${Registry.count()}`

    );

    Logger.info(

      "BOOT",

      `Registered services: ${Container.count()}`

    );

    Logger.info(

      "BOOT",

      "HYDRA READY"

    );

  }

}