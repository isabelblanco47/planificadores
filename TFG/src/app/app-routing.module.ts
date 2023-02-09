import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FifoPlannerListComponent } from './fifo-planner/fifo-planner-list/fifo-planner-list.component';
import { LifoPlannerListComponent } from './lifo-planner/lifo-planner-list/lifo-planner-list.component';
import { LruPlannerListComponent } from './lru-planner/lru-planner-list/lru-planner-list.component';
import { NavigationComponent } from './navigation/navigation.component';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'base', component: BaseComponent },
  { path: 'fifo', component: FifoPlannerListComponent },
  { path: 'lifo', component: LifoPlannerListComponent },
  { path: 'lru', component: LruPlannerListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [FifoPlannerListComponent, LifoPlannerListComponent, LruPlannerListComponent, BaseComponent, DashboardComponent, NavigationComponent]
