type Factory<T = unknown> = () => T;

interface ServiceDefinition<T = unknown> {

  id: string;

  singleton: boolean;

  factory: Factory<T>;

  instance?: T;

}

class ServiceContainer {

  private services =
    new Map<string, ServiceDefinition>();

  register<T>(

    id: string,

    factory: Factory<T>,

    singleton = true

  ) {

    if (this.services.has(id)) {

      throw new Error(

        `Service '${id}' already registered.`

      );

    }

    this.services.set(id, {

      id,

      singleton,

      factory

    });

  }

  resolve<T = unknown>(

    id: string

  ): T {

    const service =
      this.services.get(id);

    if (!service) {

      throw new Error(

        `Service '${id}' not found.`

      );

    }

    if (service.singleton) {

      if (!service.instance) {

        service.instance =
          service.factory();

      }

      return service.instance as T;

    }

    return service.factory() as T;

  }

  has(

    id: string

  ) {

    return this.services.has(id);

  }

  remove(

    id: string

  ) {

    this.services.delete(id);

  }

  clear() {

    this.services.clear();

  }

  list() {

    return Array.from(

      this.services.keys()

    );

  }

  count() {

    return this.services.size;

  }

}

const container =
  new ServiceContainer();

export default container;