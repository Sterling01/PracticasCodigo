import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasPlacasRoutingModule } from './ventas-placas-routing.module';
import { VentasPlacasComponent } from './ventas-placas.component';
import { VentasHyundaiTmpComponent } from './components/ventas-hyundai-tmp/ventas-hyundai-tmp.component';
import { BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    VentasPlacasComponent,
    VentasHyundaiTmpComponent
  ],
  imports: [
    CommonModule,
    VentasPlacasRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class VentasPlacasModule { }
