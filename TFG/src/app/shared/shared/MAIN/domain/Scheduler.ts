import { TaskDescriptor, TaskBehaviorType } from "./Descriptor";
import { TaskControlBlock, TaskState } from "./TaskControlBlock";

export class SchedulingState {

    // The task that is currently running
    running_task : TaskControlBlock | null;

    // The task that is currently using the hard disk
    hard_disk_task : TaskControlBlock | null;

    // The task that is currently using the keyboard
    keyboard_task : TaskControlBlock | null;

    // The constructor will take null as default value for all the fields
    constructor(running_task: TaskControlBlock | null = null, 
                hard_disk_task: TaskControlBlock | null = null,
                keyboard_task: TaskControlBlock | null = null) {

        this.running_task = running_task;
        this.hard_disk_task = hard_disk_task;
        this.keyboard_task = keyboard_task;

    }

}

export interface SchedulingAlgorithm {

    /**
     * This method is called when a scheduling instant is comppleted. It
     * must trigger the update of the scheduler's state.
     */
    schedule() : void;

    /**
     * This method is called every time a new task is added to the scheduler.
     * 
     * @param task the task to be added to the scheduler
     */
    startTask(task: TaskControlBlock) : void;

    /**
     * This method is called when the running task is removed from the 
     * scheduler.
     */
    exitTask() : void;

    /**
     * This method is called every time the clock ticks. 
     */
    clockTick() : void;

    /**
     * This method is called every time the running task yields the CPU to use 
     * the hard disk.
     */
    yieldHardDisk() : void;

    /**
     * This method is called every time an I/O operation on the hard disk ends.
     */
    ioHardDiskIRQ() : void;

    /**
     * This method is called every time the running task yields the CPU to wait
     * for the keyboard. 
     */
    yieldKeyboard() : void;

    /**
     * This method is called every time an I/O operation on the keyboard ends.
     */
    ioKeyboardIRQ() : void;

    /**
     * This method returns the task that is currently running or null if no
     * task is currently running.
     */
    getRunningTask() : TaskControlBlock | null;

    /**
     * This method returns the task that is currently waiting for a hard disk
     * operation to complete or null if no task is currently waiting.
     */
    getHardDiskTask() : TaskControlBlock | null;

    /**
     * This method returns the task that is currently waiting for a keyboard
     * event to occur or null if no task is currently waiting.
     */
    getKeyboardTask() : TaskControlBlock | null;

}

export class Scheduler {

    // The scheduling algorithm to be used
    algorithm : SchedulingAlgorithm;

    // The number of living tasks
    living_tasks : number = 0;

    // The next task id to be assigned
    next_task_id : number = 1;

    // The current time in clock ticks
    clock : number = 0;

    // The list of task descriptors
    task_descriptors: TaskDescriptor[] = [];

    // Map that associates a task control block to a task descriptor
    tcb_to_descriptor : Map<TaskControlBlock, TaskDescriptor> = new Map();

    
    constructor(algorithm: SchedulingAlgorithm) {

        this.algorithm = algorithm;
    
    }

    /**
     * Adds a new task to the scheduler.
     * 
     * @param descriptor the descriptor of the task to be added
     */
    appendDescriptor(descriptor: TaskDescriptor) {

        // Add the descriptor to the list of descriptors
        this.task_descriptors.push(descriptor);

        // Increment the number of living tasks
        this.living_tasks = this.living_tasks + 1;

        // Map the tcb to the descriptor
        this.tcb_to_descriptor.set(descriptor.tcb, descriptor);

    }

    run() {

        // Iterate over the tasks descriptors and call the algorithm's 
        // startTask method for those tasks with start time 0
        for (let descriptor of this.task_descriptors) {
            if (descriptor.start_time === 0) {

                descriptor.tcb.task_id = this.next_task_id;

                this.next_task_id = this.next_task_id + 1;

                this.algorithm.startTask(descriptor.tcb);
            }
        }

        // Punch it!
        this.algorithm.schedule();

        this.printStatus();

        // Main loop
        while (this.living_tasks != 0) {

            // The first step is to update the behaviour of the running task, 
            // if any. If there is a running task, we must check its descriptor
            // and update the remaining time of the current behavior. If the
            // remaining time is 0, then the behavior has ended and we must
            // update the current behavior to the next one in the list. If the
            // list is empty, then the task has ended and we must remove it
            // from the scheduler.

            let prev_running_task = this.algorithm.getRunningTask();
            
            if (prev_running_task !== null) {

                // Get the descriptor of the running task
                let descriptor = this.tcb_to_descriptor.get(prev_running_task);
                if (descriptor === undefined) {
                    // If we are here, it means that something went wrong and we
                    // could not find the descriptor of the running task
                    throw new Error("Internal error: task descriptor not found");
                } else if (descriptor.current === undefined) {
                    // If we are here, it means that no behavior has been assigned
                    throw new Error("Internal error: current behavior is undefined");
                } else {

                    // Update the remaining time of the current behavior
                    descriptor.current.remaining_time = descriptor.current.remaining_time - 1;

                    // If the remaining time is 0, then the behavior has ended
                    if (descriptor.current.remaining_time === 0) {
                        descriptor.current = descriptor.behavior.shift();

                        if (descriptor.current === undefined) {
                            // If the behavior is empty, then the task has ended
                            this.living_tasks = this.living_tasks - 1;
                            this.algorithm.exitTask();
                        } else if (descriptor.current.behavior_type === TaskBehaviorType.IO_HARD_DISK) {
                            // If the next behavior is an I/O operation on the hard disk,
                            // then the task must yield the CPU
                            this.algorithm.yieldHardDisk();
                        } else if (descriptor.current.behavior_type === TaskBehaviorType.IO_KEYBOARD) {
                            // If the next behavior is an I/O operation on the keyboard,
                            // then the task must yield the CPU
                            this.algorithm.yieldKeyboard();
                        } else {
                            throw new Error("Malformed behavior: CPU behavior not expected");
                        }
                    }
                    
                }
            }

            // Launch tick event

            this.clock = this.clock + 1;

            this.algorithm.clockTick();

            let prev_hard_disk_task = this.algorithm.getHardDiskTask();

            if (prev_hard_disk_task !== null) {

                let descriptor = this.tcb_to_descriptor.get(prev_hard_disk_task);
                if (descriptor === undefined) {
                    throw new Error("Internal error: task descriptor not found");
                } else if (descriptor.current === undefined) {
                    throw new Error("Internal error: current behavior is undefined");
                } else {

                    // Update the remaining time of the current behavior
                    descriptor.current.remaining_time = descriptor.current.remaining_time - 1;

                    // If the remaining time is 0, then the behavior has ended
                    if (descriptor.current.remaining_time === 0) {
                        descriptor.current = descriptor.behavior.shift();

                        if (descriptor.current === undefined) {
                            throw new Error("Malformed behavior: expected CPU behavior");
                        } else if (descriptor.current.behavior_type === TaskBehaviorType.CPU) {
                            this.algorithm.ioHardDiskIRQ();
                        } else {
                            throw new Error("Malformed behavior: expected CPU behavior");
                        }
                    }
                    
                }
            }

            let prev_keyboard_task = this.algorithm.getKeyboardTask();

            if (prev_keyboard_task !== null) {

                let descriptor = this.tcb_to_descriptor.get(prev_keyboard_task);
                if (descriptor === undefined) {
                    throw new Error("Internal error: task descriptor not found");
                } else if (descriptor.current === undefined) {
                    throw new Error("Internal error: current behavior is undefined");
                } else {

                    // Update the remaining time of the current behavior
                    descriptor.current.remaining_time = descriptor.current.remaining_time - 1;

                    // If the remaining time is 0, then the behavior has ended
                    if (descriptor.current.remaining_time === 0) {
                        descriptor.current = descriptor.behavior.shift();

                        if (descriptor.current === undefined) {
                            throw new Error("Malformed behavior: expected CPU behavior");
                        } else if (descriptor.current.behavior_type === TaskBehaviorType.CPU) {
                            this.algorithm.ioKeyboardIRQ();
                        } else {
                            throw new Error("Malformed behavior: expected CPU behavior");
                        }
                    }
                    
                }
            }

            // Iterate over the tasks descriptors and call the algorithm's
            // startTask method for those tasks with start time equal to the
            // current clock

            for (let descriptor of this.task_descriptors) {
                if (descriptor.start_time === this.clock) {
    
                    descriptor.tcb.task_id = this.next_task_id;
    
                    this.next_task_id = this.next_task_id + 1;
    
                    this.algorithm.startTask(descriptor.tcb);
                }
            }

            // Signal the end of the scheduling cycle
            this.algorithm.schedule();

            this.printStatus();

        }

    }

    printStatus() : void {

        console.log("Clock t = " + this.clock);

        for (let descriptor of this.task_descriptors) {

            // Print "Task <task_id> - <state>". State will be one of
            // the following:
            // RUNNING -> "runninng"
            // READY -> "ready"
            // WAITING -> "waiting"
            // TERMINATED -> "terminated"

            if (descriptor.tcb.state === TaskState.RUNNING) {
                console.log("Task " + descriptor.tcb.command + " - State: running");
            } else if (descriptor.tcb.state === TaskState.READY) {
                console.log("Task " + descriptor.tcb.command + " - State: ready");
            } else if (descriptor.tcb.state === TaskState.WAITING) {
                console.log("Task " + descriptor.tcb.command + " - State: waiting");
            } else if (descriptor.tcb.state === TaskState.TERMINATED) {
                console.log("Task " + descriptor.tcb.command + " - State: terminated");
            } else {
                console.log("Task " + descriptor.tcb.command + " - State: inactive");
            }

        }

        let hard_disk_task = this.algorithm.getHardDiskTask();

        if (hard_disk_task !== null) {
            console.log("Hard disk task: " + hard_disk_task.command);
        } else {
            console.log("Hard disk task: none");
        }

        let keyboard_task = this.algorithm.getKeyboardTask();

        if (keyboard_task !== null) {
            console.log("Keyboard task: " + keyboard_task.command);
        } else {
            console.log("Keyboard task: none");
        }


    }

}