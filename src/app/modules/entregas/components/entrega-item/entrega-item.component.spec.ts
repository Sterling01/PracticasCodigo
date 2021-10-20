import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaItemComponent } from './entrega-item.component';

describe('EntregaItemComponent', () => {
  let component: EntregaItemComponent;
  let fixture: ComponentFixture<EntregaItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntregaItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
