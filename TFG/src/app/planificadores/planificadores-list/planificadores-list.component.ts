import { Component } from '@angular/core';
import { MatCardTitleGroup } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planificadores-list',
  templateUrl: './planificadores-list.component.html',
  styleUrls: ['./planificadores-list.component.css']
})
export class PlanificadoresListComponent {

  numTareas = 0
  start_time = 0;
  type = 0;
  duration = 0;
  priority = 0;
  archivo = null;
  contador = 1
  labelInfo = ""

  constructor(private router: Router) {

  }

  ngOnInit() {
    console.warn("NGONINT")
    this.labelInfo = "Información de la Tarea " + this.contador;
    
    
  }

  
  JSONdatos = { task: [{}] }
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
    const start_time = (document.getElementById("startTime") as HTMLInputElement).value
    const priority = (document.getElementById("priority") as HTMLInputElement).value
    // se parsean a integer los datos start time y priority recibidos por input
    if (start_time != null && priority != null) {
      this.start_time = parseInt(start_time)
      this.priority = parseInt(priority)
      this.generarJSON()
    }
    this.contador += 1
    this.labelInfo = "Información de la Tarea " + this.contador;
    (document.getElementById("startTime") as HTMLInputElement).value = "";
    (document.getElementById("priority") as HTMLInputElement).value = "";
  }

  behaviourDict: any[] = []
  almacenarDatosBehaviour() {
    const type = (document.getElementById("type") as HTMLInputElement).value
    const duration = (document.getElementById("duration") as HTMLInputElement).value
    if (type != null && duration != null) {
      this.type = parseInt(type)
      this.duration = parseInt(duration)
      let temp = { "type": this.type, "duration": this.duration }
      this.behaviourDict.push(temp)

    }
    (document.getElementById("type") as HTMLInputElement).value = "";
    (document.getElementById("duration") as HTMLInputElement).value = "";
    console.log("BEHAVIOUR", this.behaviourDict)
  }
}
