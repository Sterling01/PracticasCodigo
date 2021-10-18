import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactabilidadTablasComponent } from './components/contactabilidad-tablas/contactabilidad-tablas.component';

const routes: Routes = [
  {path:'contactabilidad', component : ContactabilidadTablasComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
