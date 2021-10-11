export class ReporteContactabilidad {
    con_nom_etapa: string
    con_nom_estado_contactado: string
    con_nom_catvehiculo: string
    con_segmentacion: string
    con_plataforma: string
    con_nom_canal: string
    con_nom_medio: string
    con_nom_campana: string
    modelo_version_interes: string
    con_nom_ciudad: string
    con_nom_empresa: string
    con_nom_almacen: string
    con_nom_asesor: string
    con_cantidad: number
}

export class EmpresaSinAsignar{
    con_nom_empresa: string
    total_leads_empresa: number
    toggle: number = 0
    listaAlmacenes: Array<AlmacenSinAsignar>
}

export class AlmacenSinAsignar{
    con_nom_almacen: string
    total_leads_almacen: number
}

export class EmpresaAsignados{
    con_nom_empresa: string
    total_leads_empresa: number
    toggle: number = 0
    listaAlmacenes: Array<AlmacenAsignados>
}

export class AlmacenAsignados{
    con_nom_almacen: string
    total_leads_almacen: number
}

export class EmpresaGC{
    con_nom_empresa: string
    total_leads_contactados_empresa: number
    total_leads_no_contactados_empresa: number
    toggle: number = 0
    listaAlmacenes: Array<AlmacenGC>
}

export class AlmacenGC{
    con_nom_almacen: string
    total_leads_contactados_almacen: number
    total_leads_no_contactados_almacen: number
    toggle: number = 0
    listaAsesores: Array<AsesorGC>
}

export class AsesorGC{
    con_nom_asesor: string
    total_leads_contactados_asesor: number
    total_leads_no_contactados_asesor: number
}