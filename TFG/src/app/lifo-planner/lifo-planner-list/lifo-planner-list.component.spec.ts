import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifoPlannerListComponent } from './lifo-planner-list.component';

describe('LifoPlannerListComponent', () => {
  let component: LifoPlannerListComponent;
  let fixture: ComponentFixture<LifoPlannerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifoPlannerListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifoPlannerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
