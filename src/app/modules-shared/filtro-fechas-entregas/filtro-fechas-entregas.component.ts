import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filtro-fechas-entregas',
  templateUrl: './filtro-fechas-entregas.component.html',
  styleUrls: ['./filtro-fechas-entregas.component.css']
})
export class FiltroFechasEntregasComponent implements OnInit {

  @Output() filtroFecha : EventEmitter<any> = new EventEmitter();

  myForm: FormGroup;

  desde: Date = new Date();
  hasta: Date = new Date();

  fechas: {} = {}
  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      datedesde:new FormControl(new Date()),
      datehasta:new FormControl(new Date())
    }); 

    this.restarMes()

    this.fechas["desde"] = this.desde
    this.fechas["hasta"] = this.hasta

    this.emitirFecha()

    this.myForm.get("datedesde").valueChanges.subscribe(val => {
      this.desde =val
      this.fechas["desde"] = this.desde
      this.emitirFecha()
    });
    this.myForm.get("datehasta").valueChanges.subscribe(val => {
      this.hasta = val
      this.fechas["hasta"] = this.hasta
      this.emitirFecha()
    });

  }

  emitirFecha(){
    //console.log(this.fechas)
    this.filtroFecha.emit(this.fechas)
  }

  restarMes() {    
    var diainicio = 1000 * 60 * 60 * 24 * this.hasta.getDate();
    let resta = this.hasta.getTime() - diainicio;
    var desde = new Date(resta);
    desde.setHours(24);   
    this.myForm.get("datedesde").setValue(desde);
    this.desde = desde
  }

}
