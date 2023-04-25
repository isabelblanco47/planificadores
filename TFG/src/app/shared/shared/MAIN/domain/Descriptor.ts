import { TaskControlBlock } from "./TaskControlBlock";

export enum TaskBehaviorType {
    CPU = 0,
    IO_HARD_DISK = 1,
    IO_KEYBOARD = 2,
}

export class TaskBehavior {
    
    behavior_type: TaskBehaviorType;
    remaining_time: number;
    
    constructor(behavior_type: TaskBehaviorType, remaining_time: number) {
        this.behavior_type = behavior_type;
        this.remaining_time = remaining_time;
    }
    
}

export class TaskDescriptor {

    tcb : TaskControlBlock;
    start_time: number;

    behavior: TaskBehavior[] = [];

    current : TaskBehavior | undefined = undefined;
    
    constructor(tcb: TaskControlBlock, start_time: number) {
        this.tcb = tcb;
        this.start_time = start_time;
    }

    appendBehavior(behavior_type: TaskBehaviorType, remaining_time: number) {

        // Create the behavior
        let behavior = new TaskBehavior(behavior_type, remaining_time);

        // If this is the first behavior, set it as the current behavior
        if (this.current === undefined) {
        
            this.current = behavior;
        
        } else {

            // Add the behavior to the list of behaviors
            this.behavior.push(behavior);

        }

    }

}    