import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactabilidadComponent } from './contactabilidad.component';

describe('ContactabilidadComponent', () => {
  let component: ContactabilidadComponent;
  let fixture: ComponentFixture<ContactabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactabilidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
