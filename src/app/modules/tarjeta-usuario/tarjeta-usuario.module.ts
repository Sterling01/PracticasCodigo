import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetaUsuarioComponent } from './tarjeta-usuario.component';



@NgModule({
  declarations: [
    TarjetaUsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [TarjetaUsuarioComponent]
})
export class TarjetaUsuarioModule { }
