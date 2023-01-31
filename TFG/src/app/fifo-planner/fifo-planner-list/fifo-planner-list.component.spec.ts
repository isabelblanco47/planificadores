import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FifoPlannerListComponent } from './fifo-planner-list.component';

describe('FifoPlannerListComponent', () => {
  let component: FifoPlannerListComponent;
  let fixture: ComponentFixture<FifoPlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FifoPlannerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FifoPlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
