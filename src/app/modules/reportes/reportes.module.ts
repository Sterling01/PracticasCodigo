import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReportesComponent } from './reportes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactabilidadTablasComponent } from './components/contactabilidad-tablas/contactabilidad-tablas.component';


@NgModule({
  declarations: [
    ReportesComponent,
    ContactabilidadTablasComponent,
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ReportesModule { }
