import { Component, OnInit, ViewChild } from '@angular/core';
import { FiltroFechasEntregasComponent } from 'src/app/modules-shared/filtro-fechas-entregas/filtro-fechas-entregas.component';
import { EntregaService } from '../../services/entrega.service';

@Component({
  selector: 'app-listado-entregas',
  templateUrl: './listado-entregas.component.html',
  styleUrls: ['./listado-entregas.component.css']
})
export class ListadoEntregasComponent implements OnInit {

  listaEntrega: [] = []

  constructor(private entregaService: EntregaService) { }

  ngOnInit(): void {

  }

  limpiar_filtros(){

  }

  recibirFechas($event){
    console.log("Se reciben fechas", $event)
    /*this.entregaService.getListaEntregas().subscribe(response =>{
      console.log(response)
    })*/
  }

}
