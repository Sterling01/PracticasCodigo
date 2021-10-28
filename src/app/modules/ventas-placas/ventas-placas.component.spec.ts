import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPlacasComponent } from './ventas-placas.component';

describe('VentasPlacasComponent', () => {
  let component: VentasPlacasComponent;
  let fixture: ComponentFixture<VentasPlacasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasPlacasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasPlacasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
