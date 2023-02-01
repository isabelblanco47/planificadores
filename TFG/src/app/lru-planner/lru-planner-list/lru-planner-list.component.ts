import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lru-planner-list',
  templateUrl: './lru-planner-list.component.html',
  styleUrls: ['./lru-planner-list.component.css']
})
export class LruPlannerListComponent {

  constructor(private router:Router) { }

}
