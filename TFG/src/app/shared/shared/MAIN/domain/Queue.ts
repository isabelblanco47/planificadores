// implementacion de tasks.h

import { TaskControlBlock } from "./TaskControlBlock";


export class TaskQueue {

    private tasks: TaskControlBlock[];

    constructor() {
        this.tasks = [];
    }
    
    /**
     * This method adds a new task at the end of the queue.
     * 
     * @param item the task to be added.
     */
    enqueue(item: TaskControlBlock) {
        this.tasks.push(item);
    }

    /*
    * This method extracts the first task from the queue.
    *
    * @return the first task in the queue or undefined if the queue is empty.
    */
    dequeue(): TaskControlBlock | undefined {
        return this.tasks.shift();
    }


    /**
     * This method returns true if the queue is empty or false otherwise.
     * 
     * @return true if the queue is empty or false otherwise.
     */
    isEmpty(): boolean {
        return this.tasks.length === 0;
    }

    /**
     * This method returns the number of tasks in the queue.
     * 
     * @return the number of tasks in the queue.
     */
    size(): number {
        return this.tasks.length;
    }

    /**
     * This method inserts a new task in the queue in accordance with a given sorting function.
     * The method assumes that the queue is already sorted and uses a binary search to find the
     * correct position for the new task.
     * 
     * @param item the task to be added.
     * @param sort the sorting function. It receives two tasks and returns a number. 
     *             If the number is negative, the first task is before the second one. 
     *             If the number is positive, the first task is after the second one. 
     *             If the number is zero, the order of the tasks is not defined.
     */
    insertSorted(item: TaskControlBlock, sort: (a: TaskControlBlock, b: TaskControlBlock) => number) {
        let low = 0;
        let high = this.tasks.length;
        while (low < high) {
            const mid = (low + high) >>> 1;
            if (sort(this.tasks[mid], item) < 0) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        this.tasks.splice(low, 0, item);
    }
}
