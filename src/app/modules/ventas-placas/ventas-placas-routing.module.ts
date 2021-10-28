import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentasHyundaiTmpComponent } from './components/ventas-hyundai-tmp/ventas-hyundai-tmp.component';

const routes: Routes = [
  {path:'**', component : VentasHyundaiTmpComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasPlacasRoutingModule { }
