import { ViewportScroller } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatCardTitleGroup } from '@angular/material/card';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskDescriptor } from 'src/app/shared/shared/MAIN/domain/Descriptor';
import { FIFO } from 'src/app/shared/shared/MAIN/domain/FIFO';
import { PriorityNonPreemptive } from 'src/app/shared/shared/MAIN/domain/PriorityNonPreemptive';
import { PriorityPreemptive } from 'src/app/shared/shared/MAIN/domain/PriorityPreemptive';
import { RoundRobin } from 'src/app/shared/shared/MAIN/domain/RoundRobin';
import { Scheduler } from 'src/app/shared/shared/MAIN/domain/Scheduler';
import { TaskControlBlock } from 'src/app/shared/shared/MAIN/domain/TaskControlBlock';


@Component({
  selector: 'app-planificadores-list',
  templateUrl: './planificadores-list.component.html',
  styleUrls: ['./planificadores-list.component.css'],
})

export class PlanificadoresListComponent {

  @ViewChild('startTimeField') startTimeField: any;
  @ViewChild('priorityField') priorityField: any;
  @ViewChild('typeField') typeField: any;
  @ViewChild('durationField') durationField: any;

  panelOpenState = false;

  time_slice: number = 2;
  mostrarCampo = false
  numTareas = 0
  contador = 1
  labelInfo = ""
  tasks: any[] = []
  camposValidos = false;
  texto_JSONdatos = ""
  /** GENERACION TABLA PLANIFICADOR */
  generarTabla = false
  headersTabla: any = []
  contenidoTabla: any = []
  rowsTabla: any[][] = [];
  dataSource: any[] = [];
  headersTabla2: any = []
  rowsTabla2: any[][] = [];
  dataSource2: any[] = [];
  selectedFileName = "";
  /* VARIABLES DE CONTROL FORMULARIO */
  start_time = "";
  type = "";
  duration = "";
  priority = "";
  datosBehaviourGuardados = false;
  /* MAT-CHIP COMPROBACIONES */
  chipSeleccionado = ""

  constructor(private router: Router, private _snackBar: MatSnackBar, private scroller: ViewportScroller) {

  }

  ngOnInit() {
    console.warn("NGONINT")
    this.labelInfo = "Información de la Tarea " + this.contador;
  }

  JSONdatos = { "tasks": this.tasks }
  generarJSON() {
    let tarea = "T" + this.contador
    let temp = {
      "command": tarea,
      "start_time": parseInt(this.start_time),
      "priority": parseInt(this.priority),
      "behaviour": this.behaviourDict,
    }
    this.JSONdatos.tasks.push(temp)
    this.behaviourDict = []
    //delete this.JSONdatos.task[0] // Se elemina el primer campo del diccionario por 
    console.log("CAMPOS JSON PRUEBA 2", this.JSONdatos)
    this.texto_JSONdatos = JSON.stringify(this.JSONdatos, null, 1) // JSON.stringify(this.JSONdatos).toString()
  }

  almacenarDatosTask() {
    if (this.start_time != null && this.priority != null) {
      this.generarJSON()
    }
    let mensajePopUp = "Se ha añadido la tarea " + this.contador + " correctamente!"
    this.openSnackBar(mensajePopUp, "")
    this.contador += 1
    this.labelInfo = "Información de la Tarea " + this.contador;
    this.startTimeField.nativeElement.value = '';
    this.priorityField.nativeElement.value = '';
    this.typeField.nativeElement.value = '';
    this.durationField.nativeElement.value = '';
    this.datosBehaviourGuardados = false;

  }


  behaviourDict: any[] = []
  almacenarDatosBehaviour() {
    if (this.type != null && this.duration != null) {
      let temp = { "type": parseInt(this.type), "duration": parseInt(this.duration) }
      this.behaviourDict.push(temp)
      this.typeField.nativeElement.value = '';
      this.durationField.nativeElement.value = '';
      this.type = "";
      this.duration = "";
      this.datosBehaviourGuardados = true;
    }
    console.log("BEHAVIOUR", this.behaviourDict)
  }



  openSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, "Cerrar", {
      duration: 3000
    });
  }

  /**
   * Lectura y cargado de archivo local
   */
  lectura_archivo: any;

  archivo: any;
  fileChanged(e: any) {
    this.archivo = e.target.files[0];
    this.selectedFileName = this.archivo.name;
  }
  uploadDocument(file: any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(fileReader.result);
    }
    fileReader.readAsText(this.archivo);
    fileReader.onload = () => {
      const content: string = fileReader.result as string;
      try {
        this.lectura_archivo = JSON.parse(content);
        console.log('Archivo cargado y almacenado en variable');
        this.openSnackBar("Archivo cargado y almacenado en variable", "")
        this.texto_JSONdatos = content
      } catch (error) {
        console.error('El archivo no es un JSON válido');
        this.lectura_archivo = null;
        this.texto_JSONdatos = '';
        this.selectedFileName = ""
        this.openSnackBar("El archivo no es un JSON válido. Selecciona un archivo válido.", "")
      }
    };
  }

  /**
 * LLAMADA DE LOS DIFERENTES SIMULADORES
 */

  pulsadoFifo(): void {

    this.generarTabla = true
    this.mostrarCampo = false

    this.headersTabla = []
    this.contenidoTabla = []
    this.dataSource = []
    this.rowsTabla = []
    this.headersTabla2 = []
    this.dataSource2 = []
    this.rowsTabla2 = []

    let algorithm = new FIFO();
    let scheduler = new Scheduler(algorithm);


    if (this.JSONdatos != undefined) {
      const contenido = JSON.parse(this.texto_JSONdatos)

      // Load the items into the scheduler
      for (let i = 0; i < contenido.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          contenido.tasks[i].command,
          contenido.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, contenido.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < contenido.tasks[i].behaviour.length; j++) {
          task.appendBehavior(contenido.tasks[i].behaviour[j].type,
            contenido.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      this.headersTabla2 = scheduler.headers2
      this.rowsTabla2 = scheduler.rows2
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
      this.dataSource2 = this.rowsTabla2;
    }

  }


  pulsadoPriorityNonPreemptive(): void {
    this.generarTabla = true
    this.mostrarCampo = false

    this.headersTabla = []
    this.contenidoTabla = []
    this.dataSource = []
    this.rowsTabla = []
    this.headersTabla2 = []
    this.dataSource2 = []
    this.rowsTabla2 = []

    let algorithm = new PriorityNonPreemptive();
    let scheduler = new Scheduler(algorithm);



    if (this.JSONdatos != undefined) {
      const contenido = JSON.parse(this.texto_JSONdatos)
      // Load the items into the scheduler
      for (let i = 0; i < contenido.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          contenido.tasks[i].command,
          contenido.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, contenido.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < contenido.tasks[i].behaviour.length; j++) {
          task.appendBehavior(contenido.tasks[i].behaviour[j].type,
            contenido.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      this.headersTabla2 = scheduler.headers2
      this.rowsTabla2 = scheduler.rows2
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
      this.dataSource2 = this.rowsTabla2;
    }
  }

  pulsadoPriorityPreemtive(): void {
    this.generarTabla = true
    this.mostrarCampo = false

    this.headersTabla = []
    this.contenidoTabla = []
    this.dataSource = []
    this.rowsTabla = []
    this.headersTabla2 = []
    this.dataSource2 = []
    this.rowsTabla2 = []

    let algorithm = new PriorityPreemptive();
    let scheduler = new Scheduler(algorithm);


    if (this.JSONdatos != undefined) {
      const contenido = JSON.parse(this.texto_JSONdatos)
      // Load the items into the scheduler
      for (let i = 0; i < contenido.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          contenido.tasks[i].command,
          contenido.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, contenido.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < contenido.tasks[i].behaviour.length; j++) {
          task.appendBehavior(contenido.tasks[i].behaviour[j].type,
            contenido.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      this.headersTabla2 = scheduler.headers2
      this.rowsTabla2 = scheduler.rows2
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
      this.dataSource2 = this.rowsTabla2;
    }
  }

  mostrarCampoRR() {
    this.mostrarCampo = true
  }

  handleNumberChange() {
    // Lógica que se ejecutará cuando el valor cambie
    console.log('Se ha ingresado un nuevo número:', this.time_slice);
    // Se llama a la funcion cuando el usuario ha escrito un valor en TimeSlice.
    this.pulsadoRoundRobin();
  }

  pulsadoRoundRobin(): void {
    this.generarTabla = true

    this.headersTabla = []
    this.contenidoTabla = []
    this.dataSource = []
    this.rowsTabla = []
    this.headersTabla2 = []
    this.dataSource2 = []
    this.rowsTabla2 = []

    // TODO: Pedir timeslice al usuario y pasar al crear elemento algorithm

    let algorithm = new RoundRobin(this.time_slice);
    let scheduler = new Scheduler(algorithm);


    if (this.JSONdatos != undefined) {
      const contenido = JSON.parse(this.texto_JSONdatos)
      // Load the items into the scheduler
      for (let i = 0; i < contenido.tasks.length; i++) {

        // Allocate the TCB
        let tcb = new TaskControlBlock(0,
          contenido.tasks[i].command,
          contenido.tasks[i].priority);

        // Create the task descriptor attached to the TCB
        let task = new TaskDescriptor(tcb, contenido.tasks[i].start_time);

        // Load the behaviour into the task descriptor
        for (let j = 0; j < contenido.tasks[i].behaviour.length; j++) {
          task.appendBehavior(contenido.tasks[i].behaviour[j].type,
            contenido.tasks[i].behaviour[j].duration);
        }

        scheduler.appendDescriptor(task);

      }

      // Let's go!
      scheduler.run();
      this.headersTabla = scheduler.headers
      this.contenidoTabla = scheduler.rows
      this.headersTabla2 = scheduler.headers2
      this.rowsTabla2 = scheduler.rows2
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
      this.dataSource2 = this.rowsTabla2;
    }
  }

  /* CONTROL FORMULARIO */
  sinRellenar(variable: string) {
    return variable === ""
  }

  datosBehaviourCompletados() {
    return this.type != "" && this.duration != ""
  }

  /* ELIMINAR DATOS */

  eliminarDatos() {
    this.lectura_archivo = null;
    this.JSONdatos = { tasks: [] }
    this.texto_JSONdatos = '';
    this.contador = 1
    this.labelInfo = "Información de la Tarea " + this.contador;
    this.selectedFileName = ""

  }

  /**
 * TABLE SCROLL
 */
  goDown() {
    this.scroller.scrollToAnchor("inicioTabla");
  }

  getStyle(element: string): any {
    if (element == '0') {
      return { backgroundColor: 'black', color: 'black' };
    } else if (element == '1') {
      return { backgroundColor: '#F1C40F', color: '#F1C40F' };
    } else if (element == '2') {
      return { backgroundColor: '#27AE60', color: '#27AE60' };
    } else if (element == '3') {
      return { backgroundColor: '#F5CBA7', color: '#F5CBA7' };
    } else if (element == '4') {
      return { backgroundColor: '#E74C3C', color: '#E74C3C' };
    }
  }


}
