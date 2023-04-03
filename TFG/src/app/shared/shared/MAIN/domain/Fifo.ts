import { Queue } from "./Queue";

interface Task {
  command: string;
  start_time: number;
  priority: number;
  behaviour: [{
    type: number,
    duration: number
  }]
}

export class Fifo {
  private queue_fifo = new Queue();

  private tasks: Task[] = [
    {
      "command": "T1",
      "start_time": 0,
      "priority": 99,
      "behaviour": [{
        "type": 0,
        "duration": 4
      }]
    },
    {
      "command": "T2",
      "start_time": 2,
      "priority": 99,
      "behaviour": [{
        "type": 0,
        "duration": 4
      }]
    },
    {
      "command": "T3",
      "start_time": 1,
      "priority": 99,
      "behaviour": [{
        "type": 0,
        "duration": 4
      }]
    }
  ];

  constructor() {
    this.tasks.forEach((task: Task) => this.queue_fifo.enqueue(task));

    while (!this.queue_fifo.isEmpty()) {
      const currentTask = this.queue_fifo.dequeue();
      console.log(`Processing task ${currentTask?.command} at ${currentTask?.start_time}`);
      // Simulate processing the task by waiting for the specified duration
      setTimeout(() => {
        console.log(`Finished task ${currentTask?.command}`);
      }, currentTask?.behaviour[0].duration * 1000);
    }
  }
}
