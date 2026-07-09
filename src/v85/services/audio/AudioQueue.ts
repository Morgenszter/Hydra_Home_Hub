export interface PlayOptions {

  loop?: boolean;

  volume?: number;

  shouldPlay?: boolean;

}

export interface QueueItem<T = any> {

  id: string;

  source: T;

  priority: number;

  createdAt: number;

  options?: PlayOptions;

}

export default class AudioQueue {

  private queue: QueueItem[] = [];

  enqueue(
    item: Omit<QueueItem, "createdAt">
  ) {

    this.queue.push({

      ...item,

      createdAt: Date.now()

    });

    this.queue.sort((a, b) => {

      if (a.priority !== b.priority) {

        return b.priority - a.priority;

      }

      return a.createdAt - b.createdAt;

    });

  }

  dequeue(): QueueItem | undefined {

    return this.queue.shift();

  }

  peek(): QueueItem | undefined {

    return this.queue[0];

  }

  remove(
    id: string
  ) {

    this.queue = this.queue.filter(

      item => item.id !== id

    );

  }

  clear() {

    this.queue = [];

  }

  size() {

    return this.queue.length;

  }

  isEmpty() {

    return this.queue.length === 0;

  }

  has(
    id: string
  ) {

    return this.queue.some(

      item => item.id === id

    );

  }

  getAll() {

    return [...this.queue];

  }

}