import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntregasRoutingModule } from './entregas-routing.module';
import { EntregasComponent } from './entregas.component';
import { ListadoEntregasComponent } from './components/listado-entregas/listado-entregas.component';
import { FiltroFechasEntregasModule } from 'src/app/modules-shared/filtro-fechas-entregas/filtro-fechas-entregas.module';
import { EntregaItemComponent } from './components/entrega-item/entrega-item.component';
import { TarjetaUsuarioModule } from '../tarjeta-usuario/tarjeta-usuario.module';


@NgModule({
  declarations: [
    EntregasComponent,
    ListadoEntregasComponent,
    EntregaItemComponent,
  ],
  imports: [
    CommonModule,
    EntregasRoutingModule,
    FiltroFechasEntregasModule,
    TarjetaUsuarioModule,
  ]
})
export class EntregasModule { }
