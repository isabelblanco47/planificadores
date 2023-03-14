// implementacion de tasks.h

export class Queue<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }
    
    /* FUNCIONES PARA LA COLA */
    /*
    * enqueue: Añade el nuevo elemento a una cola (array) y retorna la lista
    */
    enqueue(item: T) {
        this.items.push(item);
    }

    /*
    * dequeue: Elimina el primer elemento de la cola (array) y lo muestra
    */
    dequeue(): T | undefined {
        return this.items.shift();
    }


    /*
    * isEmpty: Devuelve un booleano que indica si la cola está vacía
    */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /*
    * size: Devuelve la longitud de la lista
    */
    size(): number {
        return this.items.length;
    }

    /*
    *  peek: devuelve el primer elemento de la cola sin eliminarlo
    */
    peek(): T | undefined {
        return this.items[0];
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
