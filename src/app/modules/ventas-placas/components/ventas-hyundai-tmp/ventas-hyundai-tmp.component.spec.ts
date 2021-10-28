import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasHyundaiTmpComponent } from './ventas-hyundai-tmp.component';

describe('VentasHyundaiTmpComponent', () => {
  let component: VentasHyundaiTmpComponent;
  let fixture: ComponentFixture<VentasHyundaiTmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasHyundaiTmpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasHyundaiTmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
