import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemploListComponent } from './ejemplo-list.component';

describe('EjemploListComponent', () => {
  let component: EjemploListComponent;
  let fixture: ComponentFixture<EjemploListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemploListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjemploListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
