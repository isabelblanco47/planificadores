import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCardTitleGroup } from '@angular/material/card';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TaskDescriptor } from 'src/app/shared/shared/MAIN/domain/Descriptor';
import { FIFO } from 'src/app/shared/shared/MAIN/domain/FIFO';
import { Scheduler } from 'src/app/shared/shared/MAIN/domain/Scheduler';
import { TaskControlBlock } from 'src/app/shared/shared/MAIN/domain/TaskControlBlock';

@Component({
  selector: 'app-planificadores-list',
  templateUrl: './planificadores-list.component.html',
  styleUrls: ['./planificadores-list.component.css']
})
export class PlanificadoresListComponent {

  panelOpenState = false;
  control: FormControl = new FormControl("", [Validators.required])
  numTareas = 0
  start_time = "";
  type = "";
  duration = "";
  priority = "";
  contador = 1
  labelInfo = ""
  tasks: any[] = []
  camposValidos = false;
  texto_JSONdatos = ""

  constructor(private router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    console.warn("NGONINT")
    console.log("CONTROL", this.control)
    this.labelInfo = "Información de la Tarea " + this.contador;
  }

  JSONdatos = { "tasks": this.tasks }
  generarJSON() {
    let tarea = "T" + this.contador
    let temp = {
      "command": tarea,
      "start_time": this.start_time,
      "priority": this.priority,
      "behaviour": this.behaviourDict,
    }
    this.JSONdatos.tasks.push(temp)
    //delete this.JSONdatos.task[0] // Se elemina el primer campo del diccionario por 
    console.log("CAMPOS JSON PRUEBA 2", this.JSONdatos)
    this.texto_JSONdatos = JSON.stringify(this.JSONdatos).toString()
  }

  almacenarDatosTask() {
    if (this.start_time != null && this.priority != null) {
      this.generarJSON()
    }
    let mensajePopUp = "Se ha añadido la tarea " + this.contador + " correctamente!"
    this.openSnackBar(mensajePopUp, "")
    this.contador += 1
    this.labelInfo = "Información de la Tarea " + this.contador;

  }


  behaviourDict: any[] = []
  almacenarDatosBehaviour() {
    if (this.type != null && this.duration != null) {
      let temp = { "type": this.type, "duration": this.duration }
      this.behaviourDict.push(temp)
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
        this.openSnackBar("El archivo no es un JSON válido. Selecciona un archivo válido.", "")
      }
    };
  }

  /**
 * LLAMADA DE LOS DIFERENTES SIMULADORES
 */

  pulsadoFifo(): void {

    let algorithm = new FIFO();
    let scheduler = new Scheduler(algorithm);


    if (this.texto_JSONdatos != undefined) {
      console.warn( "-------------------" )
      console.warn(this.texto_JSONdatos,  "JSON DATOS")
      const contenido = JSON.parse(this.texto_JSONdatos)
      console.warn(contenido,  "JSON CONVERTIDO")
      console.log(contenido.tasks)
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

    }



  }


  pulsadoPriorityNonPreemptive(): void {
    console.log(" ----------------- ")
    console.warn("Has seleccionado Priority Preemptive")
    console.log(" ----------------- ")
  }

  pulsadoPriorityPreemtive(): void {
    console.log(" ----------------- ")
    console.warn("Has seleccionado Priority Non Preemptive")
    console.log(" ----------------- ")
  }

  pulsadoRoundRobin(): void {
    console.log(" ----------------- ")
    console.warn("Has seleccionado Round Robin")
    console.log(" ----------------- ")
  }
}
