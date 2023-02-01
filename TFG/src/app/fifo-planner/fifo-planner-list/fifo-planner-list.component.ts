import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fifo-planner-list',
  templateUrl: './fifo-planner-list.component.html',
  styleUrls: ['./fifo-planner-list.component.css']
})
export class FifoPlannerListComponent {

  constructor(private router:Router) { }
  
}
