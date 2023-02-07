import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.css']
})
export class BaseComponent {

  constructor(private router:Router) { }

  menu = [
    { nombre: "Inicio", path: "", icon: "home" },
    { nombre: "FIFO planner", path: "fifo", icon: "newspaper" },
    { nombre: "LIFO planner", path: "lifo", icon: "campaign" },
    { nombre: "LRU planner", path: "lru", icon: "today" },

  ]

  navegar(path:any) {
    this.router.navigate([path])
  }

  isExpanded = false

}
