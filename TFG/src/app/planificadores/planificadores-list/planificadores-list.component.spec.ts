import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanificadoresListComponent } from './planificadores-list.component';

describe('PlanificadoresListComponent', () => {
  let component: PlanificadoresListComponent;
  let fixture: ComponentFixture<PlanificadoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanificadoresListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanificadoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
