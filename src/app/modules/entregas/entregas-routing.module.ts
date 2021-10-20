import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregasComponent } from './components/entregas/entregas.component';
import { ListadoEntregasComponent } from './components/listado-entregas/listado-entregas.component';

const routes: Routes = [
    {path:'entregas', component : EntregasComponent},
    {path:'listado-entregas', component : ListadoEntregasComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregasRoutingModule { }
