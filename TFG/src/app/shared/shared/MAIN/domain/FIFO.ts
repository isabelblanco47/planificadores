import { TaskQueue } from "./Queue";
import { SchedulingAlgorithm, SchedulingState } from "./Scheduler";
import { TaskControlBlock, TaskState } from "./TaskControlBlock";

export class FIFO implements SchedulingAlgorithm {

  private ready_task_queue = new TaskQueue();
  private hard_disk_waiting_queue = new TaskQueue();
  private keyboard_waiting_queue = new TaskQueue();

  private state : SchedulingState = new SchedulingState();

  private next_state : SchedulingState = new SchedulingState();

  schedule(): void {

    this.state = this.next_state;
    this.next_state = new SchedulingState(this.state.running_task, 
      this.state.hard_disk_task, this.state.keyboard_task);

  }
  
  startTask(task: TaskControlBlock): void {

    if (this.next_state.running_task === null) {
      this.next_state.running_task = task;
      task.state = TaskState.RUNNING;
    } else {
      task.state = TaskState.READY;
      this.ready_task_queue.enqueue(task);
    }

  }

  exitTask(): void {

    let running_task = this.getRunningTask();

    if (running_task === null) {
      throw new Error("No task was running!");
    }

    running_task.state = TaskState.TERMINATED;

    let next_task = this.ready_task_queue.dequeue();

    if (next_task !== undefined) {
      this.next_state.running_task = next_task;
      next_task.state = TaskState.RUNNING;
    } else {
      this.next_state.running_task = null;
    }

  }

  clockTick(): void {

    // Nothing to be done here
  
  }

  yieldHardDisk(): void {

    // Get the running task
    let running_task = this.getRunningTask();

    // If there is no running task, then something is wrong
    if (running_task === null) {
      throw new Error("No task was running!");
    }

    running_task.state = TaskState.WAITING;

    if (this.getHardDiskTask() === null) {
      this.next_state.hard_disk_task = running_task;
    } else {
      this.hard_disk_waiting_queue.enqueue(running_task);
    }

    let next_task = this.ready_task_queue.dequeue();

    if (next_task !== undefined) {
      this.next_state.running_task = next_task;
      next_task.state = TaskState.RUNNING;
    } else {
      this.next_state.running_task = null;
    }

  }

  ioHardDiskIRQ(): void {

    let hard_disk_task = this.getHardDiskTask();

    if (hard_disk_task === null) {
      throw new Error("No task was waiting on the hard disk!");
    }

    // Check if there was another task waiting on the hard disk
    let next_hard_disk_task = this.hard_disk_waiting_queue.dequeue();

    if (next_hard_disk_task !== undefined) {
      this.next_state.hard_disk_task = next_hard_disk_task;
    } else {
      this.next_state.hard_disk_task = null;
    }

    // Check if there was already a task in execution

    if (this.next_state.running_task !== null) {
      // If there was a task already going to run, put this one on ready
      // state and append it to the end of the ready queue
      hard_disk_task.state = TaskState.READY;
      this.ready_task_queue.enqueue(hard_disk_task);
    } else {
      // If there was no task previously going to run, set this one to running
      // state and dispatch it to the CPU

      this.next_state.running_task = hard_disk_task;
      hard_disk_task.state = TaskState.RUNNING;

    }

    
  }
  yieldKeyboard(): void {

    let running_task = this.getRunningTask();

    if (running_task === null) {
      throw new Error("No task was running!");
    }

    running_task.state = TaskState.WAITING;

    if (this.getKeyboardTask() === null) {
      this.next_state.keyboard_task = running_task;
    } else {
      this.keyboard_waiting_queue.enqueue(running_task);
    }

    let next_task = this.ready_task_queue.dequeue();

    if (next_task !== undefined) {
      this.next_state.running_task = next_task;
      next_task.state = TaskState.RUNNING;
    } else {
      this.next_state.running_task = null;
    }

  }

  ioKeyboardIRQ(): void {

    let keyboard_task = this.getKeyboardTask();

    if (keyboard_task === null) {
      throw new Error("No task was waiting on the keyboard!");
    }

    // Check if there was another task waiting on the keyboard
    let next_keyboard_task = this.keyboard_waiting_queue.dequeue();

    if (next_keyboard_task !== undefined) {
      this.next_state.keyboard_task = next_keyboard_task;
    } else {
      this.next_state.keyboard_task = null;
    }

    // Check if there was already a task in execution

    if (this.getRunningTask() !== null) {
      // If there was a task already running, put this one on ready
      // state and append it to the end of the ready queue
      keyboard_task.state = TaskState.READY;
      this.ready_task_queue.enqueue(keyboard_task);
    } else {
      // If there was no task previously running, set this one to running
      // state and dispatch it to the CPU

      this.next_state.running_task = keyboard_task;
      keyboard_task.state = TaskState.RUNNING;

    }

  }

  getRunningTask(): TaskControlBlock | null {
    return this.state.running_task;
  }
  getHardDiskTask(): TaskControlBlock | null {
    return this.state.hard_disk_task;
  }
  getKeyboardTask(): TaskControlBlock | null {
    return this.state.keyboard_task;
  }
  
}
