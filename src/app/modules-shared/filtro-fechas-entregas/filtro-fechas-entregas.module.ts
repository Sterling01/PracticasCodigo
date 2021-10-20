import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltroFechasEntregasComponent } from './filtro-fechas-entregas.component';
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


/*
Cuando se crea un nuevo module-shared, se debe poner el exports. 
Y añadir los modules necesarios, en este caso para las fechas se pusieron los modulos de los forms.
*/ 

/*
Este módulo debe ser importado en modulo más grande del modules/entregas
*/

@NgModule({
  declarations: [
    FiltroFechasEntregasComponent
  ],
  imports: [
    CommonModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [FiltroFechasEntregasComponent]
})
export class FiltroFechasEntregasModule { }
