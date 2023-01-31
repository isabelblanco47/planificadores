import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FifoPlannerListComponent } from './fifo-planner/fifo-planner-list/fifo-planner-list.component';
import { LifoPlannerListComponent } from './lifo-planner/lifo-planner-list/lifo-planner-list.component';
import { LruPlannerListComponent } from './lru-planner/lru-planner-list/lru-planner-list.component';

const routes: Routes = [
  { path: 'fifo', component: FifoPlannerListComponent },
  { path: 'lifo', component: LifoPlannerListComponent },
  { path: 'lru', component: LruPlannerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [FifoPlannerListComponent, LifoPlannerListComponent, LruPlannerListComponent]
