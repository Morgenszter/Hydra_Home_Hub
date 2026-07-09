

export {};

// HYDRA_COMPAT_METRICS_EXPORTS
export type MetricValue = {
  name: string;
  value: number;
  unit?: string;
};

export class Metrics {
  private values: MetricValue[] = [];

  push(metric: MetricValue) {
    this.values.push(metric);
  }

  all() {
    return this.values;
  }
}

export default Metrics;
