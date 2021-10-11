import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReportesService } from '../../services/reportes.service';


@Component({
  selector: 'app-contactabilidad',
  templateUrl: './contactabilidad.component.html',
  styleUrls: ['./contactabilidad.component.css']
})
export class ContactabilidadComponent implements OnInit {

  @Output() filtros : EventEmitter<any> = new EventEmitter();

  constructor(private reportesService: ReportesService) { }

  categorias= ["TAXIS", "LIVIANOS", "PESADOS"]
  procedencias= ["CONCESIONARIOS", "MARCA"]
  canales= ["BOT", "DIGITAL"]
  medios= ["COTIZADOR", "LÍNEA TELEFONICA", "FACEBOOK"]

  parametrosFiltros: {} = {};
  
  ngOnInit() {
  }

  onChange(filtro: string, value: string){
    // Si no se selecciona el mismo check se agrega y se llama a la función
    if(this.parametrosFiltros[filtro] != value){
      this.parametrosFiltros[filtro] = value
      this.filtros.emit(this.parametrosFiltros)
    }
  }
  
}
