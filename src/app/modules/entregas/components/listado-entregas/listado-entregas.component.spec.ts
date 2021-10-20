import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEntregasComponent } from './listado-entregas.component';

describe('ListadoEntregasComponent', () => {
  let component: ListadoEntregasComponent;
  let fixture: ComponentFixture<ListadoEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
