import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lifo-planner-list',
  templateUrl: './lifo-planner-list.component.html',
  styleUrls: ['./lifo-planner-list.component.css']
})
export class LifoPlannerListComponent {
  constructor(private router:Router) { }

}
