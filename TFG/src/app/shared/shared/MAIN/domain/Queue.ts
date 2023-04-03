// implementacion de tasks.h


interface Task {
    command: string;
    start_time: number;
    priority: number;
    behaviour: {
        type: number;
        duration: number;
    }
}

export class Queue{
    private elementos: Task[];

    constructor() {
        this.elementos = [];
    }
    
    /* FUNCIONES PARA LA COLA */
    /*
    * enqueue: Añade el nuevo elemento a una cola (array) y retorna la lista
    */
    enqueue(item: Task) {
        this.elementos.push(item);
    }

    /*
    * dequeue: Elimina el primer elemento de la cola (array) y lo muestra
    */
    dequeue(): Task | undefined {
        return this.elementos.shift();
    }


    /*
    * isEmpty: Devuelve un booleano que indica si la cola está vacía
    */
    isEmpty(): boolean {
        return this.elementos.length === 0;
    }

    /*
    * size: Devuelve la longitud de la lista
    */
    size(): number {
        return this.elementos.length;
    }

    /*
    *  peek: devuelve el primer elemento de la cola sin eliminarlo
    */
    peek(): Task | undefined {
        return this.elementos[0];
    }

    /* SETTER y GETTERS*/
    //TO DO: getPriority, setPriority, getTimeslice, setTimeslice, getState, setState.

    /* ALGORITMOS DE ORDENACIÓN */
    insertionSort(arr: number[]): number[] {
        const n = arr.length;

        for (let i = 1; i < n; i++) {
            const key = arr[i];
            let j = i - 1;

            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }

            arr[j + 1] = key;
        }

        return arr;
    }
}
