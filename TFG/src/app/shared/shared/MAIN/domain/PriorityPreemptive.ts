interface Sched_algorithm{
    procesos: []; //property
    run(arg: any):void; //method
}

class PriorityPreemptive implements Sched_algorithm{
    procesos: [];
    constructor(procesos: []) {
        this.procesos = procesos;
    }

    run(arg: any): void {
        console.log(`running: ${this.procesos}, arg: ${arg}`);
    }
}