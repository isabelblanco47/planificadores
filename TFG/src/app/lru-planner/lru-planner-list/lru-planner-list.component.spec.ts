import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LruPlannerListComponent } from './lru-planner-list.component';

describe('LruPlannerListComponent', () => {
  let component: LruPlannerListComponent;
  let fixture: ComponentFixture<LruPlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LruPlannerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LruPlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
