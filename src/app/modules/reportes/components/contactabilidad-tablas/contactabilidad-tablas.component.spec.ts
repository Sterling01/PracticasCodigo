import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactabilidadTablasComponent } from './contactabilidad-tablas.component';

describe('ContactabilidadTablasComponent', () => {
  let component: ContactabilidadTablasComponent;
  let fixture: ComponentFixture<ContactabilidadTablasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactabilidadTablasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactabilidadTablasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
