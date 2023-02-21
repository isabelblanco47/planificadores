import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatCardTitleGroup } from '@angular/material/card';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  task: any[] = []
  camposValidos = false;
  constructor(private router: Router, private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    console.warn("NGONINT")
    console.log("CONTROL", this.control)
    this.labelInfo = "Información de la Tarea " + this.contador;
  }

  JSONdatos = { "task": this.task }
  generarJSON() {
    let tarea = "T" + this.contador
    let temp = {
      "command": tarea,
      "start_time": this.start_time,
      "priority": this.priority,
      "behaviour": this.behaviourDict,
    }
    this.JSONdatos.task.push(temp)
    //delete this.JSONdatos.task[0] // Se elemina el primer campo del diccionario por 
    console.log("CAMPOS JSON PRUEBA 2", this.JSONdatos)
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
    this.actualizarJSONSnippet()
  }

  actualizarJSONSnippet() {
    var element = document.getElementById("JSON_snippet")?.innerHTML;
    console.log("valor element", element)
  }

  openSnackBar(mensaje: string, action: string) {
    this._snackBar.open(mensaje, "Cerrar", {
      duration: 3000
    });
  }



}
