import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactabilidadTablasComponent } from './components/contactabilidad-tablas/contactabilidad-tablas.component';
import { ContactabilidadComponent } from './components/contactabilidad/contactabilidad.component';
import { ReportesComponent } from './reportes.component';

const routes: Routes = [
  {path:'', component: ReportesComponent, children:[
    {path:'contactabilidad', component : ContactabilidadTablasComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
