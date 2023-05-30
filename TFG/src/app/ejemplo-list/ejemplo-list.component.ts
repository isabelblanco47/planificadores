import { Component } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { FIFO } from '../shared/shared/MAIN/domain/FIFO';
import { Scheduler } from '../shared/shared/MAIN/domain/Scheduler';
import { TaskDescriptor } from '../shared/shared/MAIN/domain/Descriptor';
import { TaskControlBlock } from '../shared/shared/MAIN/domain/TaskControlBlock';
import { MatTableDataSource } from '@angular/material/table';
import { PriorityNonPreemptive } from '../shared/shared/MAIN/domain/PriorityNonPreemptive';
import { PriorityPreemptive } from '../shared/shared/MAIN/domain/PriorityPreemptive';
import { RoundRobin } from '../shared/shared/MAIN/domain/RoundRobin';

@Component({
  selector: 'app-ejemplo-list',
  templateUrl: './ejemplo-list.component.html',
  styleUrls: ['./ejemplo-list.component.css']
})
export class EjemploListComponent {

  constructor(private router: Router) {

  }
  generarTabla = false
  headersTabla: any = []
  contenidoTabla: any = []
  rowsTabla: any[][] = [];
  dataSource: any[] = [];

  /** DECLARACIÓN DE LOS JSON DE EJEMPLO **/
  sample_cpu_json = {
    "tasks": [
      {
        "command": "T1", "start_time": 0, "priority": 99, "behaviour": [
          { "type": 0, "duration": 4 }]
      },
      {
        "command": "T2", "start_time": 0, "priority": 99, "behaviour": [
          { "type": 0, "duration": 4 }]
      },
      {
        "command": "T3", "start_time": 0, "priority": 99, "behaviour": [
          { "type": 0, "duration": 4 }]
      }]
  }

  sample_interactive = {
    "tasks": [
      {
        "command": "T1", "start_time": 2, "priority": 9, "behaviour": [
          { "type": 0, "duration": 2 },
          { "type": 1, "duration": 4 },
          { "type": 0, "duration": 2 }]
      },
      {
        "command": "T2", "start_time": 0, "priority": 1, "behaviour": [
          { "type": 0, "duration": 4 },
          { "type": 1, "duration": 2 },
          { "type": 0, "duration": 1 }]
      },
      {
        "command": "T3", "start_time": 0, "priority": 2, "behaviour": [
          { "type": 0, "duration": 4 },
          { "type": 1, "duration": 5 },
          { "type": 0, "duration": 1 },
          { "type": 2, "duration": 10 },
          { "type": 0, "duration": 3 }]
      }]
  }

  sample_io_bound = {
    "tasks": [
      {
        "command": "T1", "start_time": 0, "priority": 99, "behaviour": [
          { "type": 0, "duration": 1 },
          { "type": 1, "duration": 10 },
          { "type": 0, "duration": 1 }]
      },
      {
        "command": "T2", "start_time": 2, "priority": 99, "behaviour": [
          { "type": 0, "duration": 1 },
          { "type": 2, "duration": 10 },
          { "type": 0, "duration": 1 }]
      },
      {
        "command": "T3", "start_time": 0, "priority": 99, "behaviour": [
          { "type": 0, "duration": 4 },
          { "type": 1, "duration": 10 },
          { "type": 0, "duration": 1 }]
      }]
  }

  selected = ""

  opciones_ejemplo: any[] = [
    {
      value: { "tasks": [{ "command": "T1", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }] }, { "command": "T2", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }] }, { "command": "T3", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }] }] },
      nombre: 'Sample CPU JSON',
      opcion: "ejemplo1",
    },
    {
      value: { "tasks": [{ "command": "T1", "start_time": 2, "priority": 9, "behaviour": [{ "type": 0, "duration": 2 }, { "type": 1, "duration": 4 }, { "type": 0, "duration": 2 }] }, { "command": "T2", "start_time": 0, "priority": 1, "behaviour": [{ "type": 0, "duration": 4 }, { "type": 1, "duration": 2 }, { "type": 0, "duration": 1 }] }, { "command": "T3", "start_time": 0, "priority": 2, "behaviour": [{ "type": 0, "duration": 4 }, { "type": 1, "duration": 5 }, { "type": 0, "duration": 1 }, { "type": 2, "duration": 10 }, { "type": 0, "duration": 3 }] }] },
      nombre: 'Sample Interactive',
      opcion: "ejemplo2",
    },
    {
      value: { "tasks": [{ "command": "T1", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 1 }, { "type": 1, "duration": 10 }, { "type": 0, "duration": 1 }] }, { "command": "T2", "start_time": 2, "priority": 99, "behaviour": [{ "type": 0, "duration": 1 }, { "type": 2, "duration": 10 }, { "type": 0, "duration": 1 }] }, { "command": "T3", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }, { "type": 1, "duration": 10 }, { "type": 0, "duration": 1 }] }] },
      nombre: 'Sample IO Bound',
      opcion: "ejemplo3",
    },
  ];


  ngOnInit() {
  }

  /*
   * Datos necesarios para generar las tablas en el HTML
   */
  displayedColumns: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol1'];
  displayedColumns2: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol1', 'demo-symbol2', 'demo-symbol3', 'demo-symbol4', 'demo-symbol5'];
  displayedColumns3: string[] = ['demo-position', 'demo-name', 'demo-weight', 'demo-symbol1', 'demo-symbol2', 'demo-symbol3'];
  elementos_ej1: any[] = [
    { name: 'T1', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4" },
    { name: 'T2', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4" },
    { name: 'T3', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4" },
  ];

  elementos_ej2: any[] = [
    { name: 'T1', start_time: 2, priority: 9, behaviour1: "Type: 0 Duration: 2", behaviour2: "Type: 1 Duration: 4", behaviour3: "Type: 0 Duration: 2" },
    { name: 'T2', start_time: 0, priority: 1, behaviour1: "Type: 0 Duration: 4", behaviour2: "Type: 1 Duration: 2", behaviour3: "Type: 0 Duration: 1" },
    { name: 'T3', start_time: 0, priority: 2, behaviour1: "Type: 0 Duration: 4", behaviour2: "Type: 1 Duration: 5", behaviour3: "Type: 0 Duration: 1", behaviour4: "Type: 2 Duration: 10", behaviour5: "Type: 0 Duration: 3" },
  ];

  elementos_ej3: any[] = [
    { name: 'T1', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 1", behaviour2: "Type: 1 Duration: 10", behaviour3: "Type: 0 Duration: 1" },
    { name: 'T2', start_time: 2, priority: 99, behaviour1: "Type: 0 Duration: 1", behaviour2: "Type: 2 Duration: 10", behaviour3: "Type: 0 Duration: 1" },
    { name: 'T3', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4", behaviour2: "Type: 1 Duration: 10", behaviour3: "Type: 0 Duration: 1" },
  ];


  pulsadoFifo(): void {
    this.generarTabla = true

    let algorithm = new FIFO();
    let scheduler = new Scheduler(algorithm);


    if (this.selected != undefined) {
      const example = this.opciones_ejemplo.find((ejemplo) => ejemplo.opcion === this.selected).value;
      // Load the items into the scheduler
      for (let i = 0; i < example.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          example.tasks[i].command,
          example.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, example.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < example.tasks[i].behaviour.length; j++) {
          task.appendBehavior(example.tasks[i].behaviour[j].type,
            example.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      //this.dataSource = new MatTableDataSource(this.contenidoTabla);

      const numRows = Math.ceil(this.contenidoTabla.length / this.headersTabla.length);

      for (let i = 0; i < numRows; i++) {
        const row: any[] = [];
        for (let j = 0; j < this.headersTabla.length; j++) {
          const index = (i * this.headersTabla.length) + j;
          row.push(this.contenidoTabla[index]);
        }
        this.rowsTabla.push(row);
      }
  
      this.dataSource = this.rowsTabla;
    }

  }

  pulsadoPriorityNonPreemptive(): void {

    this.generarTabla = true

    let algorithm = new PriorityNonPreemptive();
    let scheduler = new Scheduler(algorithm);


    if (this.selected != undefined) {
      const example = this.opciones_ejemplo.find((ejemplo) => ejemplo.opcion === this.selected).value;
      // Load the items into the scheduler
      for (let i = 0; i < example.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          example.tasks[i].command,
          example.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, example.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < example.tasks[i].behaviour.length; j++) {
          task.appendBehavior(example.tasks[i].behaviour[j].type,
            example.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      //this.dataSource = new MatTableDataSource(this.contenidoTabla);

      const numRows = Math.ceil(this.contenidoTabla.length / this.headersTabla.length);

      for (let i = 0; i < numRows; i++) {
        const row: any[] = [];
        for (let j = 0; j < this.headersTabla.length; j++) {
          const index = (i * this.headersTabla.length) + j;
          row.push(this.contenidoTabla[index]);
        }
        this.rowsTabla.push(row);
      }
  
      this.dataSource = this.rowsTabla;
    }

  }

  pulsadoPriorityPreemtive(): void {
    this.generarTabla = true

    let algorithm = new PriorityPreemptive();
    let scheduler = new Scheduler(algorithm);


    if (this.selected != undefined) {
      const example = this.opciones_ejemplo.find((ejemplo) => ejemplo.opcion === this.selected).value;
      // Load the items into the scheduler
      for (let i = 0; i < example.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          example.tasks[i].command,
          example.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, example.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < example.tasks[i].behaviour.length; j++) {
          task.appendBehavior(example.tasks[i].behaviour[j].type,
            example.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      //this.dataSource = new MatTableDataSource(this.contenidoTabla);

      const numRows = Math.ceil(this.contenidoTabla.length / this.headersTabla.length);

      for (let i = 0; i < numRows; i++) {
        const row: any[] = [];
        for (let j = 0; j < this.headersTabla.length; j++) {
          const index = (i * this.headersTabla.length) + j;
          row.push(this.contenidoTabla[index]);
        }
        this.rowsTabla.push(row);
      }
  
      this.dataSource = this.rowsTabla;
    }

  }

  pulsadoRoundRobin(): void {
    this.generarTabla = true

    let algorithm = new RoundRobin();
    let scheduler = new Scheduler(algorithm);


    if (this.selected != undefined) {
      const example = this.opciones_ejemplo.find((ejemplo) => ejemplo.opcion === this.selected).value;
      // Load the items into the scheduler
      for (let i = 0; i < example.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          example.tasks[i].command,
          example.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, example.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < example.tasks[i].behaviour.length; j++) {
          task.appendBehavior(example.tasks[i].behaviour[j].type,
            example.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      //this.dataSource = new MatTableDataSource(this.contenidoTabla);

      const numRows = Math.ceil(this.contenidoTabla.length / this.headersTabla.length);

      for (let i = 0; i < numRows; i++) {
        const row: any[] = [];
        for (let j = 0; j < this.headersTabla.length; j++) {
          const index = (i * this.headersTabla.length) + j;
          row.push(this.contenidoTabla[index]);
        }
        this.rowsTabla.push(row);
      }
  
      this.dataSource = this.rowsTabla;
    }

  }


  /**
   * GENERACION DE TABLAS DEL PLANIFICADOR
   */


}



