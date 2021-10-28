import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-ventas-hyundai-tmp',
  templateUrl: './ventas-hyundai-tmp.component.html',
  styleUrls: ['./ventas-hyundai-tmp.component.css']
})
export class VentasHyundaiTmpComponent implements OnInit {
  
  modalref: BsModalRef;

  formFinaliza: FormGroup;

  motivoFinaliza: any

  plavaVieja = "AAA-123"

  placaAntigua: string

  modificando: boolean = false

  constructor(private modalService:BsModalService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.formFinaliza = this.formBuilder.group({
      nueva_placa: ['', []]
    });

    this.formFinaliza.get("nueva_placa").valueChanges.subscribe(m => {
      console.log(m)
      this.placaAntigua = m
    });

  }

  abrirFinalizar(template: TemplateRef<any>){
    this.modalref = this.modalService.show(template,Object.assign({}, { class: "modal-dialog-centered" }));
  }

  finalizarEntregav1(){
    this.modificando = true
    console.log(this.placaAntigua)
    this.modificando = false
  }

}
