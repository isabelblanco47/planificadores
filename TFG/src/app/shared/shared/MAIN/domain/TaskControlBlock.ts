
/**
 * This enum represents the possible states of a task.
 */
export enum TaskState {

    INACTIVE = 0,
    READY = 1,
    RUNNING = 2,
    WAITING = 3,
    TERMINATED = 4

}

/**
 * This class represents a task control block. It contains all the information
 * about a task.
 */
export class TaskControlBlock {

    task_id : number;
    command: string;
    priority: number;
    timeslice: number;
    state: TaskState;

    constructor(task_id: number, command: string, priority: number, timeslice: number = 0) {
        this.task_id = task_id;
        this.command = command;
        this.priority = priority;
        this.timeslice = timeslice;
        this.state = TaskState.INACTIVE;
    }

}