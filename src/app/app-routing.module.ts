import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'reportes', loadChildren:() => import('./modules/reportes/reportes.module').then(m => m.ReportesModule)},
  { path: 'ventas', loadChildren:() => import('./modules/ventas-placas/ventas-placas.module').then(m => m.VentasPlacasModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
