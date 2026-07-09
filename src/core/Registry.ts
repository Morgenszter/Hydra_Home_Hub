export interface RegistryItem<T = unknown> {

  id: string;

  name: string;

  instance: T;

  enabled: boolean;

  createdAt: number;

}

class Registry {

  private modules =
    new Map<string, RegistryItem>();

  register<T>(
    id: string,
    name: string,
    instance: T
  ) {

    if (this.modules.has(id)) {

      throw new Error(
        `Module '${id}' already exists.`
      );

    }

    this.modules.set(
      id,
      {
        id,
        name,
        instance,
        enabled: true,
        createdAt: Date.now()
      }
    );

  }

  unregister(
    id: string
  ) {

    this.modules.delete(id);

  }

  has(
    id: string
  ) {

    return this.modules.has(id);

  }

  get<T = unknown>(
    id: string
  ): T | undefined {

    return this.modules.get(id)
      ?.instance as T | undefined;

  }

  enable(
    id: string
  ) {

    const module =
      this.modules.get(id);

    if (!module) {

      return false;

    }

    module.enabled = true;

    return true;

  }

  disable(
    id: string
  ) {

    const module =
      this.modules.get(id);

    if (!module) {

      return false;

    }

    module.enabled = false;

    return true;

  }

  isEnabled(
    id: string
  ) {

    return (
      this.modules.get(id)
        ?.enabled ?? false
    );

  }

  list() {

    return Array.from(
      this.modules.values()
    );

  }

  ids() {

    return Array.from(
      this.modules.keys()
    );

  }

  count() {

    return this.modules.size;

  }

  clear() {

    this.modules.clear();

  }

}

const registry =
  new Registry();

export default registry;