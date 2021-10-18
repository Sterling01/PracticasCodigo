import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregasRoutingModule } from './entregas-routing.module';
import { EntregasComponent } from './entregas.component';


@NgModule({
  declarations: [
    EntregasComponent
  ],
  imports: [
    CommonModule,
    EntregasRoutingModule
  ]
})
export class EntregasModule { }
