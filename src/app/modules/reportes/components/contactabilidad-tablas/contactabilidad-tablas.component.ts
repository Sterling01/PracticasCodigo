import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlmacenAsignados, AlmacenGC, AlmacenSinAsignar, AsesorGC, EmpresaAsignados, EmpresaGC, EmpresaSinAsignar, ReporteContactabilidad } from 'src/app/models/ReporteContactabilidad';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-contactabilidad-tablas',
  templateUrl: './contactabilidad-tablas.component.html',
  styleUrls: ['./contactabilidad-tablas.component.css']
})
export class ContactabilidadTablasComponent implements OnInit {

  titulos: String [] = ["PERIODO", "CATEGORIA", "PROCEDENCIA", "PLATAFORMA", "CANAL", "MEDIO"]
  titulos2: String [] = ["CAMPAÑA", "MODELO", "CIUDAD", "CONCESIONARIOS", "USUARIO"]

  filtrosEstado: {} = {"categorias": false, "procedencias": false, "plataformas": false, "canales": false,
                "medios": false, "campanas": false, "modelos": false, "ciudades": false, "concesionarios": false,
                "usuarios": false,}
  
  constructor(private reportesService: ReportesService) { }

  reportesContactabilidad: ReporteContactabilidad [] = []

  // FILTROS
  filtroCategoria: String[] = []
  filtroProcedencia: String[] = []
  filtroPlataforma: String[] = []
  filtroCanal: String[] = []
  filtroMedio: String[] = []
  filtroCampana: String[] = []
  filtroModelo: String[] = []
  filtroCiudad: String[] = []
  filtroConcesionario: String[] = []
  filtroUsuario: String[] = []

  // TABLAS
  leadsSinAsignar: ReporteContactabilidad[] = []
  leadsAsignados: ReporteContactabilidad[] = []
  leadsGC: ReporteContactabilidad[] = []

  parametrosFiltros: {} = {} 
  
  ngOnInit() {
    this.getReportes()
  }
  
  onChange(filtro: string, value: string){
    // Si no se selecciona el mismo check se agrega y se llama a la función
    if(this.parametrosFiltros[filtro] != value){
      this.parametrosFiltros[filtro] = value

      let sinAsignarFiltrados: ReporteContactabilidad [] = this.filtrarReportes(this.leadsSinAsignar)
      let asignadosFiltrados: ReporteContactabilidad [] = this.filtrarReportes(this.leadsAsignados)
      let gcFiltrados: ReporteContactabilidad [] = this.filtrarReportes(this.leadsGC)

      let nuevosFiltrados = sinAsignarFiltrados.concat(asignadosFiltrados)

      this.cargarFiltros(nuevosFiltrados)
      this.cargarTablasSinAsignar(sinAsignarFiltrados)
      this.cargarTablasAsignados(asignadosFiltrados)
      this.cargarTablasGC(gcFiltrados)
    }
  }

  leadSinAsignar: EmpresaSinAsignar[] = []
  leadAsignados: EmpresaAsignados[] = []
  leadGC: EmpresaGC[] = []

  totalSinAsignar: number = 0
  totalAsignados: number = 0
  totalGCContactados: number = 0
  totalGCNoContactados: number = 0

  private getReportes(){
    // Consumir inicialmente el servicio que saca todos los reportes

    // Cargar los reportes obteniendo las fechas
    /*
    let desde:Date = new Date(this.myForm.get("datedesde").value);
    let hasta:Date = new Date(this.myForm.get("datehasta").value);

    this.parametros ["fecha_desde"] = desde
    this.parametros ["fecha_hasta"] = hasta
    */

    this.reportesService.getJSON().subscribe( response =>{
      this.reportesContactabilidad = response.data
      this.cargarReportes(this.reportesContactabilidad)
      this.cargarFiltros(this.reportesContactabilidad)
    })
  }

  private cargarReportes(dataReportes : ReporteContactabilidad []){

    // Se reciben los reportes del WS  y se filtran para tener sin asignar, asignados y para gestión de contactabilidad
    this.leadsSinAsignar = dataReportes.filter(item => item.con_nom_etapa === "LEAD" && item.con_nom_asesor === "USUARIO CONCESIONARIO")
    this.leadsAsignados = dataReportes.filter(item => item.con_nom_etapa === "LEAD" && item.con_nom_asesor !== "USUARIO CONCESIONARIO")
    this.leadsGC = dataReportes.filter(item => item.con_nom_etapa === "LEAD" && item.con_nom_asesor !== "USUARIO CONCESIONARIO")
    
    // Se pasan a cargar cada una de las tablas 
    this.cargarTablasSinAsignar(this.leadsSinAsignar)
    this.cargarTablasAsignados(this.leadsAsignados)
    this.cargarTablasGC(this.leadsGC)
  }

  private cargarFiltros(dataReportes: ReporteContactabilidad []){
    if(this.parametrosFiltros["categoria"] == undefined)
        this.filtroCategoria = []
    if(this.parametrosFiltros["procedencia"] == undefined)
      this.filtroProcedencia = []
    if(this.parametrosFiltros["plataforma"] == undefined)
      this.filtroPlataforma = []
    if(this.parametrosFiltros["canal"] == undefined)
      this.filtroCanal = []
    if(this.parametrosFiltros["medio"] == undefined)
      this.filtroMedio = []
    if(this.parametrosFiltros["campana"] == undefined) 
      this.filtroCampana = []
    if(this.parametrosFiltros["modelo"] == undefined)
      this.filtroModelo = []
    if(this.parametrosFiltros["ciudad"] == undefined)
      this.filtroCiudad = []
    if(this.parametrosFiltros["concesionario"] == undefined)
      this.filtroConcesionario = []
    if(this.parametrosFiltros["usuario"] == undefined)
      this.filtroUsuario = []
  
    dataReportes.forEach((element: ReporteContactabilidad) => {
      if(this.parametrosFiltros["categoria"] == undefined)
        if(!this.filtroCategoria.includes(element.con_nom_catvehiculo))
          this.filtroCategoria.push(element.con_nom_catvehiculo)
      if(this.parametrosFiltros["procedencia"] == undefined)
        if(!this.filtroProcedencia.includes(element.con_segmentacion))
          this.filtroProcedencia.push(element.con_segmentacion)
      if(this.parametrosFiltros["plataforma"] == undefined)
        if(!this.filtroPlataforma.includes(element.con_plataforma))
          this.filtroPlataforma.push(element.con_plataforma)
      if(this.parametrosFiltros["canal"] == undefined)
        if(!this.filtroCanal.includes(element.con_nom_canal))
          this.filtroCanal.push(element.con_nom_canal)
      if(this.parametrosFiltros["medio"] == undefined)
        if(!this.filtroMedio.includes(element.con_nom_medio))
          this.filtroMedio.push(element.con_nom_medio)
      if(this.parametrosFiltros["campana"] == undefined)    
        if(!this.filtroCampana.includes(element.con_nom_campana))
          this.filtroCampana.push(element.con_nom_campana)
      if(this.parametrosFiltros["modelo"] == undefined)
        if(!this.filtroModelo.includes(element.modelo_version_interes))
          this.filtroModelo.push(element.modelo_version_interes)
      if(this.parametrosFiltros["ciudad"] == undefined)
        if(!this.filtroCiudad.includes(element.con_nom_ciudad))
          this.filtroCiudad.push(element.con_nom_ciudad)
      if(this.parametrosFiltros["concesionario"] == undefined)
        if(!this.filtroConcesionario.includes(element.con_nom_empresa))
          this.filtroConcesionario.push(element.con_nom_empresa)
      if(this.parametrosFiltros["usuario"] == undefined)
        if(!this.filtroUsuario.includes(element.con_nom_asesor))
          this.filtroUsuario.push(element.con_nom_asesor)
    });
    this.setFiltrosEstado(true)
  }

  private filtrarReportes(reportesSinAsignar: ReporteContactabilidad[]){
    let reportesFiltrados = reportesSinAsignar

    if(this.parametrosFiltros["categoria"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_catvehiculo == this.parametrosFiltros["categoria"])
    }
    if(this.parametrosFiltros["procedencia"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_segmentacion == this.parametrosFiltros["procedencia"])
    }
    if(this.parametrosFiltros["plataforma"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_plataforma == this.parametrosFiltros["plataforma"])
    }
    if(this.parametrosFiltros["canal"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_canal == this.parametrosFiltros["canal"])
    }
    if(this.parametrosFiltros["medio"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_medio == this.parametrosFiltros["medio"])
    }
    if(this.parametrosFiltros["campana"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_campana == this.parametrosFiltros["campana"])
    }
    if(this.parametrosFiltros["modelo"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.modelo_version_interes == this.parametrosFiltros["modelo"])
    }
    if(this.parametrosFiltros["ciudad"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_ciudad == this.parametrosFiltros["ciudad"])
    }
    if(this.parametrosFiltros["concesionario"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_empresa == this.parametrosFiltros["concesionario"])
    }
    if(this.parametrosFiltros["usuario"] != undefined){
      reportesFiltrados = reportesFiltrados.filter(item => item.con_nom_asesor == this.parametrosFiltros["usuario"])
    }
    
    console.log("Filtrao ", reportesFiltrados)
    return reportesFiltrados
  }


  // Método para cargar los datos en la tabla Leads Sin Asignar
  private cargarTablasSinAsignar(reportesSinAsignar: ReporteContactabilidad[]){

    this.leadSinAsignar = []
    this.totalSinAsignar = 0

    let empresas: string[] = []
    let almacenes: string[] = []

    reportesSinAsignar.forEach(reporte => {
      if(!empresas.includes(reporte.con_nom_empresa)){
        empresas.push(reporte.con_nom_empresa)
      }
      if(!almacenes.includes(reporte.con_nom_almacen)){
        almacenes.push(reporte.con_nom_almacen)
      }
    })
    
    let total_leads_empresa: number = 0;
    let cantLeadsEmpresa: number = 0;
    let cantLeadsAlmacen: number = 0;
    empresas.forEach(empresa => {
      let nuevaEmpresa: EmpresaSinAsignar = new EmpresaSinAsignar();
      nuevaEmpresa.con_nom_empresa = empresa
      nuevaEmpresa.listaAlmacenes = []
      nuevaEmpresa.toggle= 0
      cantLeadsEmpresa = 0
      almacenes.forEach(almacen => {
        cantLeadsAlmacen = 0
        reportesSinAsignar.forEach(reporte => {
          if(reporte.con_nom_empresa === empresa && reporte.con_nom_almacen === almacen){
            cantLeadsAlmacen += 1
          }
        });
        if(cantLeadsAlmacen > 0){
          let nuevoAlmacen: AlmacenSinAsignar = new AlmacenSinAsignar()
          nuevoAlmacen.con_nom_almacen = almacen
          nuevoAlmacen.total_leads_almacen = cantLeadsAlmacen
          nuevaEmpresa.listaAlmacenes.push(nuevoAlmacen)
          cantLeadsEmpresa += cantLeadsAlmacen
        }
      });
      total_leads_empresa += cantLeadsEmpresa
      nuevaEmpresa.total_leads_empresa = cantLeadsEmpresa
      this.leadSinAsignar.push(nuevaEmpresa)
    });
    this.totalSinAsignar += total_leads_empresa
  }

  expandOrCollapseSinAsignar(empresa: EmpresaSinAsignar){
    this.leadSinAsignar.forEach(element => {
      if(element.con_nom_empresa == empresa.con_nom_empresa){
        if(empresa.toggle == 0){
          element.toggle = 1;
        }else{
          element.toggle = 0;
        }
      }
    });
  }

  private cargarTablasAsignados(reportesAsignados: ReporteContactabilidad[]){

    this.leadAsignados = []
    this.totalAsignados = 0

    let empresas: string[] = []
    let almacenes: string[] = []

    reportesAsignados.forEach(reporte => {
      if(!empresas.includes(reporte.con_nom_empresa)){
        empresas.push(reporte.con_nom_empresa)
      }
      if(!almacenes.includes(reporte.con_nom_almacen)){
        almacenes.push(reporte.con_nom_almacen)
      }
    })
    
    let total_leads_empresa: number = 0;
    let cantLeadsEmpresa: number = 0;
    let cantLeadsAlmacen: number = 0;
    empresas.forEach(empresa => {
      let nuevaEmpresa: EmpresaAsignados = new EmpresaAsignados();
      nuevaEmpresa.con_nom_empresa = empresa
      nuevaEmpresa.listaAlmacenes = []
      nuevaEmpresa.toggle= 0
      cantLeadsEmpresa = 0
      almacenes.forEach(almacen => {
        cantLeadsAlmacen = 0
        reportesAsignados.forEach(reporte => {
          if(reporte.con_nom_empresa === empresa && reporte.con_nom_almacen === almacen){
            cantLeadsAlmacen += 1
          }
        });
        if(cantLeadsAlmacen > 0){
          let nuevoAlmacen: AlmacenAsignados = new AlmacenAsignados()
          nuevoAlmacen.con_nom_almacen = almacen
          nuevoAlmacen.total_leads_almacen = cantLeadsAlmacen
          nuevaEmpresa.listaAlmacenes.push(nuevoAlmacen)
          cantLeadsEmpresa += cantLeadsAlmacen
        }
      });
      total_leads_empresa += cantLeadsEmpresa
      nuevaEmpresa.total_leads_empresa = cantLeadsEmpresa
      this.leadAsignados.push(nuevaEmpresa)
    });

    this.totalAsignados += total_leads_empresa
  }

  expandOrCollapseAsignados(empresa: EmpresaAsignados){
    this.leadAsignados.forEach(element => {
      if(element.con_nom_empresa == empresa.con_nom_empresa){
        if(empresa.toggle == 0){
          element.toggle = 1;
        }else{
          element.toggle = 0;
        }
      }
    });
  }

  private cargarTablasGC(reportesGC: ReporteContactabilidad[]){

    this.leadGC = []
    this.totalGCContactados = 0
    this.totalGCNoContactados = 0

    let total_leads_empresa: number = 0;
    let empresas: string[] = []
    let almacenes: string[] = []
    let asesores: string[] = []

    reportesGC.forEach(reporte => {
      if(!empresas.includes(reporte.con_nom_empresa)){
        empresas.push(reporte.con_nom_empresa)
      }
      if(!almacenes.includes(reporte.con_nom_almacen)){
        almacenes.push(reporte.con_nom_almacen)
      }
      if(!asesores.includes(reporte.con_nom_asesor)){
        asesores.push(reporte.con_nom_asesor)
      }
    })

    let totalEmpresaGCContactados = 0;
    let totalEmpresaGCNoContactados = 0;
    let cantLeadsEmpresaC = 0;
    let cantLeadsEmpresaNC = 0;
    let cantLeadsAlmacenC = 0;
    let cantLeadsAlmacenNC = 0;
    let cantLeadsAsesorC = 0;
    let cantLeadsAsesorNC = 0;

    empresas.forEach(empresa => {
      let nuevaEmpresa: EmpresaGC = new EmpresaGC();
      nuevaEmpresa.con_nom_empresa = empresa
      nuevaEmpresa.listaAlmacenes = []
      nuevaEmpresa.toggle= 0
      cantLeadsEmpresaC = 0
      cantLeadsEmpresaNC = 0
      almacenes.forEach(almacen => {
        let nuevoAlmacen: AlmacenGC = new AlmacenGC();
        nuevoAlmacen.con_nom_almacen = almacen
        nuevoAlmacen.listaAsesores = []
        nuevoAlmacen.toggle = 0
        cantLeadsAlmacenC = 0;
        cantLeadsAlmacenNC = 0;
        asesores.forEach(asesor => {
          cantLeadsAsesorC = 0;
          cantLeadsAsesorNC = 0;
          reportesGC.forEach(reporte => {
            if(reporte.con_nom_empresa === empresa && reporte.con_nom_almacen === almacen && reporte.con_nom_asesor === asesor){
              if(reporte.con_nom_estado_contactado === "CONTACTADO")
                cantLeadsAsesorC += 1;
              else
                cantLeadsAsesorNC += 1;
            }
          })
          if (cantLeadsAsesorC > 0 || cantLeadsAsesorNC > 0)
          {
            let nuevoAsesor: AsesorGC = new AsesorGC();
            nuevoAsesor.con_nom_asesor = asesor;
            nuevoAsesor.total_leads_contactados_asesor = cantLeadsAsesorC;
            nuevoAsesor.total_leads_no_contactados_asesor = cantLeadsAsesorNC;
            nuevoAlmacen.listaAsesores.push(nuevoAsesor);
            cantLeadsAlmacenC += cantLeadsAsesorC;
            cantLeadsAlmacenNC += cantLeadsAsesorNC;
          }
        })
        if(cantLeadsAlmacenC > 0 || cantLeadsAlmacenNC > 0)
        {
          nuevoAlmacen.total_leads_contactados_almacen = cantLeadsAlmacenC;
          nuevoAlmacen.total_leads_no_contactados_almacen = cantLeadsAlmacenNC;
          nuevaEmpresa.listaAlmacenes.push(nuevoAlmacen);
          cantLeadsEmpresaC += cantLeadsAlmacenC;
          cantLeadsEmpresaNC += cantLeadsAlmacenNC;
        }  
      })
      totalEmpresaGCContactados += cantLeadsEmpresaC;
      totalEmpresaGCNoContactados += cantLeadsEmpresaNC;
      nuevaEmpresa.total_leads_contactados_empresa = cantLeadsEmpresaC;
      nuevaEmpresa.total_leads_no_contactados_empresa = cantLeadsEmpresaNC;
      this.leadGC.push(nuevaEmpresa);
    });
    this.totalGCContactados += totalEmpresaGCContactados
    this.totalGCNoContactados += totalEmpresaGCNoContactados
  }


  expandOrCollapseGestion(empresa: EmpresaGC){
    console.log("Desplegar empresa", empresa)
    this.leadGC.forEach(element => {
      if(element.con_nom_empresa == empresa.con_nom_empresa){
        if(empresa.toggle == 0){
          element.toggle = 1;
        }else{
          element.toggle = 0;
        }
      }
    });
  }

  expandOrCollapseGestionAsesor(almacen: AlmacenGC){
    console.log("Desplegar almacen asesores", almacen)
    this.leadGC.forEach(element => {
      element.listaAlmacenes.forEach(elementAlmacen =>{
        if(almacen.con_nom_almacen == elementAlmacen.con_nom_almacen){
          if(almacen.toggle == 0){
            elementAlmacen.toggle = 1;
          }else{
            elementAlmacen.toggle = 0;
          }
        }
      })
    })
  }

  private setFiltrosEstado(estado: boolean){
    this.filtrosEstado["categorias"] = estado
    this.filtrosEstado["procedencias"] = estado
    this.filtrosEstado["plataformas"] = estado
    this.filtrosEstado["canales"] = estado
    this.filtrosEstado["medios"] = estado
    this.filtrosEstado["campanas"] = estado
    this.filtrosEstado["modelos"] = estado
    this.filtrosEstado["ciudades"] = estado
    this.filtrosEstado["concesionarios"] = estado
    this.filtrosEstado["usuarios"] = estado
  }

  funcionFiltroEstado(filtro: string): boolean{
    return this.filtrosEstado[filtro]
  }
}
