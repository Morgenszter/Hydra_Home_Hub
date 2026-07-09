

export {};

// HYDRA_COMPAT_STORE_EXPORTS
export type HydraStoreState = {
  online: boolean;
  logs: string[];
};

export class HydraStore {
  private state: HydraStoreState = {
    online: false,
    logs: [],
  };

  getState() {
    return this.state;
  }

  setOnline(online: boolean) {
    this.state = { ...this.state, online };
    return this.state;
  }

  addLog(message: string) {
    this.state = { ...this.state, logs: [...this.state.logs, message] };
    return this.state;
  }
}

export default HydraStore;
