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
    { nombre: "Menú principal", path: "base", icon: "newspaper" },
  ]

  navegar(path:any) {
    this.router.navigate([path])
  }

  isExpanded = false

}
