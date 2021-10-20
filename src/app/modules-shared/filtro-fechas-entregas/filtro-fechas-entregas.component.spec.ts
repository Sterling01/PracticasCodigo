import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFechasEntregasComponent } from './filtro-fechas-entregas.component';

describe('FiltroFechasEntregasComponent', () => {
  let component: FiltroFechasEntregasComponent;
  let fixture: ComponentFixture<FiltroFechasEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroFechasEntregasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroFechasEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
