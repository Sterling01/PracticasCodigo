import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})
export class EntregasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getDatos = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Buenas tardes")
      }, 1500);
    })
  }

  getImage(src){
    return new Promise((resolve, reject) => {
      let img = new Image()
      img.onload = () => resolve(true)
      img.onerror = reject
      img.src = src
    })
  }

  async generarPDF(){

    await console.log("Buenos dias")

    //await this.getDatos().then(height => console.log(height))

    let estadoFirmaCliente
    let estadoFirmaAsesor

    try {
      await this.getImage("assets/6fcff5472ecanje.png").then(valor => estadoFirmaCliente = valor)
    } catch (error) {
      console.log("Error, ", error)
      estadoFirmaCliente = false
    }

    try {
      await this.getImage("assets/alex.jpg").then(valor => estadoFirmaAsesor = valor)
    } catch (error) {
      console.log("Error, ", error)
      estadoFirmaAsesor = false
    }
    
    console.log("Cliente ", estadoFirmaCliente)
    console.log("Asesor ", estadoFirmaAsesor)

    await console.log("Buenas noches")


    /*if(validacionFirmaCliente = true){
      console.log("Hay imagen")
    }else{
      console.log("No hay imagen")
    }*/
    
    //console.log("Estado de la imagen: ", validacionFirmaCliente)
  }


}
