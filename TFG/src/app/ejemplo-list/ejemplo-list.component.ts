import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ejemplo-list',
  templateUrl: './ejemplo-list.component.html',
  styleUrls: ['./ejemplo-list.component.css']
})
export class EjemploListComponent {

  constructor(private router: Router) {

  }

  /** DECLARACIÓN DE LOS JSON DE EJEMPLO **/
  sample_cpu_json = { "tasks": [{ "command": "T1", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }] }, { "command": "T2", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }] }, { "command": "T3", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }] }] }

  sample_interactive = { "tasks": [{ "command": "T1", "start_time": 2, "priority": 9, "behaviour": [{ "type": 0, "duration": 2 }, { "type": 1, "duration": 4 }, { "type": 0, "duration": 2 }] }, { "command": "T2", "start_time": 0, "priority": 1, "behaviour": [{ "type": 0, "duration": 4 }, { "type": 1, "duration": 2 }, { "type": 0, "duration": 1 }] }, { "command": "T3", "start_time": 0, "priority": 2, "behaviour": [{ "type": 0, "duration": 4 }, { "type": 1, "duration": 5 }, { "type": 0, "duration": 1 }, { "type": 2, "duration": 10 }, { "type": 0, "duration": 3 }] }] }

  sample_io_bound = { "tasks": [{ "command": "T1", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 1 }, { "type": 1, "duration": 10 }, { "type": 0, "duration": 1 }] }, { "command": "T2", "start_time": 2, "priority": 99, "behaviour": [{ "type": 0, "duration": 1 }, { "type": 2, "duration": 10 }, { "type": 0, "duration": 1 }] }, { "command": "T3", "start_time": 0, "priority": 99, "behaviour": [{ "type": 0, "duration": 4 }, { "type": 1, "duration": 10 }, { "type": 0, "duration": 1 }] }] }

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
    { name: 'T1', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4"},
    { name: 'T2', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4"},
    { name: 'T3', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4"},
  ];

  elementos_ej2: any[] = [
    { name: 'T1', start_time: 2, priority: 9, behaviour1: "Type: 0 Duration: 2", behaviour2: "Type: 1 Duration: 4", behaviour3: "Type: 0 Duration: 2" },
    { name: 'T2', start_time: 0, priority: 1, behaviour1: "Type: 0 Duration: 4", behaviour2: "Type: 1 Duration: 2", behaviour3: "Type: 0 Duration: 1" },
    { name: 'T3', start_time: 0, priority: 2, behaviour1: "Type: 0 Duration: 4", behaviour2: "Type: 1 Duration: 5", behaviour3: "Type: 0 Duration: 1", behaviour4: "Type: 2 Duration: 10", behaviour5: "Type: 0 Duration: 3" },
  ];

  elementos_ej3: any[] = [
    { name: 'T1', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 1", behaviour2: "Type: 1 Duration: 10", behaviour3: "Type: 0 Duration: 1" },
    { name: 'T2', start_time: 2, priority: 99, behaviour1: "Type: 0 Duration: 1", behaviour2: "Type: 2 Duration: 10", behaviour3: "Type: 0 Duration: 1" },
    { name: 'T3', start_time: 0, priority: 99, behaviour1: "Type: 0 Duration: 4", behaviour2: "Type: 1 Duration: 10", behaviour3: "Type: 0 Duration: 1"},
  ];


}
