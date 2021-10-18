import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntregasComponent } from './components/entregas/entregas.component';

const routes: Routes = [
    {path:'entregas', component : EntregasComponent},
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntregasRoutingModule { }
