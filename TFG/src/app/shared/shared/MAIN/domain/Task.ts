// implementacion de tasks.h

export class Task {
    command: string;
    start_time: number;
    priority: number;
    behaviour: {
        type: number;
        duration: number;
    }
    
    constructor(command: string, start_time: number, priority: number, type: number, duration: number) {
        this.command = command,
        this.start_time = start_time,
        this.priority = priority,
        this.behaviour = {"type":type,"duration":duration}
    }
}    