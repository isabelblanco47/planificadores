import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planificadores-list',
  templateUrl: './planificadores-list.component.html',
  styleUrls: ['./planificadores-list.component.css']
})
export class PlanificadoresListComponent {

  numTareas = 0
  start_time = 0;
  archivo = null;

  constructor(private router: Router) {

  }

  ngOnInit() {
    console.warn("NGONINT")
    this.generarJSON()
  }

  elementos: any = []
  solicitarNumeroTareas() {
    console.warn("ENTRO")
    const element = (document.getElementById("numTareas") as HTMLInputElement).value
    if (element != null) {
      this.numTareas = parseInt(element)
      this.elementos = Array(this.numTareas).fill(0);
    }
    this.generarJSON()
  }
  emptyList: any[] = []
  /**   JSONdatos = {
      "tasks": this.emptyList
    }*/
  JSONdatos = { task: [{}] }
  generarJSON() {

    for (let i = 1; i <= this.numTareas; i++) {
      let tarea = "T" + i
      let temp = { "command": tarea }
      this.JSONdatos.task.push(temp)

    }
    delete this.JSONdatos.task[0] //se elimina el primer elemento del diccionario ya que es el clave-valor
    console.log(this.JSONdatos, "JSON::::")
    console.log("LONGITUD", Object.keys(this.JSONdatos.task).length)
  }
}
