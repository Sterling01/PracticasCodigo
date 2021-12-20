using System;
using System.Collections.Generic;
using System.Text;

namespace CapaEntidad.REPORTES
{

    public class E_Reporte_Productividad
    {
        public int ges_cliente { get; set; }
        public int ges_usuario { get; set; }
        public int ges_canal { get; set; }
        public int ges_almacen { get; set; }
        public int ges_prc_estado { get; set; }
        public int ges_cod_proceso { get; set; }
        public int ges_desistido { get; set; }
        public int ges_prd_agendado { get; set; }
        public int ges_wld_agendado { get; set; }
        public int? ges_prc_contactado { get; set; }
        public int ges_wld_contactado { get; set; }
        public int ges_prc_idoneo { get; set; }
        public DateTime ges_prc_fecha { get; set; }
    }


    public class E_Reporte_Productividad_Datos
    {
        public E_Almacen almacen { get; set; }
        public List<E_Reporte_Prod_Ase_Datos> asesores_clientes_list { get; set; }
    }

    public class E_Reporte_Prod_Ase_Datos
    {
        public E_Usuario usuario { get; set; }
        public int clientes_activos { get; set; }
        public int clientes_nuevos { get; set; }
        public int clientes_agendados { get; set; }
        public int clientes_nuevos_agendados { get; set; }
        public int clientes_prospectados { get; set; }
        public List<E_Reporte_Canal_Datos> canales_clientes_list { get; set; }
    }

    public class E_Reporte_Canal_Datos
    {
        public E_Canal canal { get; set; }
        public int cantidad_clientes_canal { get; set; }
        public List<E_Cliente_Canal_Datos> clientes_canal_list { get; set; }
    }

    public class E_Cliente_Canal_Datos
    {
        public int cliente_codigo { get; set; }
        public int? cliente_prc_contactado { get; set; }
        public int cliente_wld_contactado { get; set; }
        public DateTime cliente_prc_fecha { get; set; }

    }
}
