using System;
using System.Collections.Generic;
using System.Text;
using CapaEntidad.REPORTES;

namespace CapaNegocio.REPORTES
{
    public class N_Reporte_Productividad
    {

        public List<E_Reporte_Productividad_Datos> getReporteProductividad ()
        {
            List<E_Reporte_Productividad> datosReporte = new List<E_Reporte_Productividad>();

            E_Reporte_Productividad reporte1 = new E_Reporte_Productividad();
            reporte1.ges_usuario = 189;
            reporte1.ges_cliente = 497894;
            reporte1.ges_canal = 8;
            reporte1.ges_almacen = 4;
            reporte1.ges_prc_fecha = new DateTime(2021, 12, 19, 7, 47, 0);


            E_Reporte_Productividad reporte2 = new E_Reporte_Productividad();
            reporte2.ges_usuario = 1;
            reporte2.ges_cliente = 444444;
            reporte2.ges_canal = 7;
            reporte2.ges_almacen = 4;
            reporte2.ges_prc_fecha = new DateTime(2021, 12, 12, 17, 47, 0);

            E_Reporte_Productividad reporte3 = new E_Reporte_Productividad();
            reporte3.ges_usuario = 177;
            reporte3.ges_cliente = 499999;
            reporte3.ges_canal = 7;
            reporte3.ges_almacen = 197;
            reporte3.ges_prc_fecha = new DateTime(2021, 12, 13, 10, 47, 0);


            E_Reporte_Productividad reporte4 = new E_Reporte_Productividad();
            reporte4.ges_usuario = 177;
            reporte4.ges_cliente = 500000;
            reporte4.ges_canal = 7;
            reporte4.ges_almacen = 197;
            reporte4.ges_prc_fecha = new DateTime(2021, 12, 15, 12, 47, 0);

            // Cliente repetido en otro canal
            E_Reporte_Productividad reporte5 = new E_Reporte_Productividad();
            reporte5.ges_usuario = 177;
            reporte5.ges_cliente = 500000;
            reporte5.ges_canal = 8;
            reporte5.ges_almacen = 197;
            reporte5.ges_prc_contactado = 1;
            reporte5.ges_prc_fecha = new DateTime(2021, 12, 18, 14, 47, 0);

            datosReporte.Add(reporte1);
            datosReporte.Add(reporte2);
            datosReporte.Add(reporte3);
            datosReporte.Add(reporte4);
            datosReporte.Add(reporte5);


            List<E_Reporte_Productividad_Datos> datosReturn = new List<E_Reporte_Productividad_Datos>();

            datosReporte.ForEach(reporte =>
            {
                var almacen = datosReturn.Find(x => x.almacen.alm_codigo == reporte.ges_almacen);

                if (almacen != null)
                {
                    if (almacen.asesores_clientes_list != null)
                    {
                        var usuario = almacen.asesores_clientes_list.Find(x => x.usuario.usr_codigo == reporte.ges_usuario);

                        if(usuario != null)
                        {
                            if (usuario.canales_clientes_list != null)
                            {
                                // Si el usuario ya tiene canales
                                // Verificar que el nuevo CLIENTE no exista en ninguno de los canales.
                                //var clienteExist = (usuario.canales_clientes_list.Find(x => x.clientes_canal_list != null).clientes_canal_list.Find(y => y.cli_codigo == reporte.ges_cliente));
                                var canalClienteExists = this.verifyClientExists(usuario, reporte);


                                // Si es mayor a 0 ya existe un cliente en algún canal
                                if (canalClienteExists > 0)
                                {
                                    // Si el cliente esta en el mismo canal se valida alguno de los cambios para cambiar los valores de las cantidades del reporte.
                                    if(canalClienteExists == reporte.ges_canal)
                                    {
                                        var clienteExistente = usuario.canales_clientes_list.Find(x => x.canal.can_codigo == canalClienteExists).clientes_canal_list.Find(x => x.cliente_codigo == reporte.ges_cliente);

                                        if(clienteExistente.cliente_prc_contactado != reporte.ges_prc_contactado)
                                        {
                                            if(clienteExistente.cliente_prc_contactado == null && reporte.ges_prc_contactado != null)
                                            {
                                                clienteExistente.cliente_prc_contactado = reporte.ges_prc_contactado;
                                            }
                                        }

                                    }
                                    // Si el cliente está en otro canal, se valida si esta agendado, contactado, etc.
                                    else
                                    {
                                        var clienteExistente = usuario.canales_clientes_list.Find(x => x.canal.can_codigo == canalClienteExists).clientes_canal_list.Find(x => x.cliente_codigo == reporte.ges_cliente);

                                        if(clienteExistente.cliente_prc_contactado == null && reporte.ges_prc_contactado != null)
                                        {
                                            //usuario.canales_clientes_list.Remove(usuario.canales_clientes_list.Find(x => x.canal.can_codigo == canalClienteExists));
                                            usuario.canales_clientes_list.Find(x => x.canal.can_codigo == canalClienteExists).clientes_canal_list.Remove(clienteExistente);
                                            if (clienteExistente.cliente_prc_fecha.Date == DateTime.Now.Date)
                                            {
                                                usuario.clientes_nuevos -= 1;
                                            }
                                            usuario.canales_clientes_list.Find(x => x.canal.can_codigo == canalClienteExists).cantidad_clientes_canal -= 1;

                                            E_Reporte_Canal_Datos datosCanal = new E_Reporte_Canal_Datos();
                                            datosCanal.canal = new CapaEntidad.E_Canal();
                                            datosCanal.canal.can_codigo = reporte.ges_canal;
                                            datosCanal.cantidad_clientes_canal += 1;
                                            datosCanal.clientes_canal_list = new List<E_Cliente_Canal_Datos>();

                                            E_Cliente_Canal_Datos clienteDatos = new E_Cliente_Canal_Datos();
                                            clienteDatos.cliente_codigo = reporte.ges_cliente;
                                            clienteDatos.cliente_prc_fecha = reporte.ges_prc_fecha;
                                            clienteDatos.cliente_prc_contactado = reporte.ges_prc_contactado;
                                            if (clienteDatos.cliente_prc_fecha.Date == DateTime.Now.Date)
                                            {
                                                usuario.clientes_nuevos += 1;
                                            }

                                            datosCanal.clientes_canal_list.Add(clienteDatos);
                                            usuario.canales_clientes_list.Add(datosCanal);
                                        }
                                    }
                                }
                                else
                                {
                                    var canal = usuario.canales_clientes_list.Find(x => x.canal.can_codigo == reporte.ges_canal);

                                    if (canal != null)
                                    {
                                        E_Cliente_Canal_Datos cliente = new E_Cliente_Canal_Datos();
                                        cliente.cliente_codigo = reporte.ges_cliente;
                                        cliente.cliente_prc_fecha = reporte.ges_prc_fecha;
                                        cliente.cliente_prc_contactado = reporte.ges_prc_contactado;
                                        if (cliente.cliente_prc_fecha.Date == DateTime.Now.Date)
                                        {
                                            usuario.clientes_nuevos += 1;
                                        }
                                        canal.clientes_canal_list.Add(cliente);
                                        canal.cantidad_clientes_canal += 1;
                                    }
                                    else
                                    {
                                        E_Reporte_Canal_Datos datosCanal = new E_Reporte_Canal_Datos();
                                        datosCanal.canal = new CapaEntidad.E_Canal();
                                        datosCanal.canal.can_codigo = reporte.ges_canal;
                                        datosCanal.clientes_canal_list = new List<E_Cliente_Canal_Datos>();

                                        E_Cliente_Canal_Datos clienteDatos = new E_Cliente_Canal_Datos();
                                        clienteDatos.cliente_codigo = reporte.ges_cliente;
                                        clienteDatos.cliente_prc_fecha = reporte.ges_prc_fecha;
                                        clienteDatos.cliente_prc_contactado = reporte.ges_prc_contactado;
                                        if (clienteDatos.cliente_prc_fecha.Date == DateTime.Now.Date)
                                        {
                                            usuario.clientes_nuevos += 1;
                                        }

                                        datosCanal.clientes_canal_list.Add(clienteDatos);
                                        usuario.canales_clientes_list.Add(datosCanal);
                                    }

                                }
                            }
                            else
                            {
                                usuario.canales_clientes_list = new List<E_Reporte_Canal_Datos>();

                                E_Reporte_Canal_Datos datosCanal = new E_Reporte_Canal_Datos();
                                datosCanal.canal = new CapaEntidad.E_Canal();
                                datosCanal.canal.can_codigo = reporte.ges_canal;
                                datosCanal.cantidad_clientes_canal += 1;
                                datosCanal.clientes_canal_list = new List<E_Cliente_Canal_Datos>();

                                E_Cliente_Canal_Datos clienteDatos = new E_Cliente_Canal_Datos();
                                clienteDatos.cliente_codigo = reporte.ges_cliente;
                                clienteDatos.cliente_prc_fecha = reporte.ges_prc_fecha;
                                clienteDatos.cliente_prc_contactado = reporte.ges_prc_contactado;
                                if (clienteDatos.cliente_prc_fecha.Date == DateTime.Now.Date)
                                {
                                    usuario.clientes_nuevos += 1;
                                }

                                datosCanal.clientes_canal_list.Add(clienteDatos);
                                usuario.clientes_activos += 1;
                                //usuario.clientes_nuevos += 1;
                                usuario.canales_clientes_list.Add(datosCanal);
                            }
                        }
                        else
                        {
                            E_Reporte_Prod_Ase_Datos asesorDatos = new E_Reporte_Prod_Ase_Datos();
                            asesorDatos.usuario = new CapaEntidad.E_Usuario();
                            asesorDatos.usuario.usr_codigo = reporte.ges_usuario;
                            asesorDatos.canales_clientes_list = new List<E_Reporte_Canal_Datos>();

                            E_Reporte_Canal_Datos datosCanal = new E_Reporte_Canal_Datos();
                            datosCanal.canal = new CapaEntidad.E_Canal();
                            datosCanal.canal.can_codigo = reporte.ges_canal;
                            datosCanal.cantidad_clientes_canal += 1;
                            datosCanal.clientes_canal_list = new List<E_Cliente_Canal_Datos>();

                            E_Cliente_Canal_Datos clienteDatos = new E_Cliente_Canal_Datos();
                            clienteDatos.cliente_codigo = reporte.ges_cliente;
                            clienteDatos.cliente_prc_fecha = reporte.ges_prc_fecha;
                            clienteDatos.cliente_prc_contactado = reporte.ges_prc_contactado;
                            if (clienteDatos.cliente_prc_fecha.Date == DateTime.Now.Date)
                            {
                                asesorDatos.clientes_nuevos += 1;
                            }

                            datosCanal.clientes_canal_list.Add(clienteDatos);
                            asesorDatos.clientes_activos += 1;
                            //asesorDatos.clientes_nuevos += 1;
                            asesorDatos.canales_clientes_list.Add(datosCanal);
                            almacen.asesores_clientes_list.Add(asesorDatos);

                        }
                    }
                }
                else
                {
                    E_Reporte_Productividad_Datos rep = new E_Reporte_Productividad_Datos();
                    rep.almacen = new CapaEntidad.E_Almacen();
                    rep.almacen.alm_codigo = reporte.ges_almacen;
                    rep.asesores_clientes_list = new List<E_Reporte_Prod_Ase_Datos>();

                    E_Reporte_Prod_Ase_Datos asesorDatos = new E_Reporte_Prod_Ase_Datos();
                    asesorDatos.usuario = new CapaEntidad.E_Usuario();
                    asesorDatos.usuario.usr_codigo = reporte.ges_usuario;
                    asesorDatos.canales_clientes_list = new List<E_Reporte_Canal_Datos>();

                    E_Reporte_Canal_Datos datosCanal = new E_Reporte_Canal_Datos();
                    datosCanal.canal = new CapaEntidad.E_Canal();
                    datosCanal.canal.can_codigo = reporte.ges_canal;
                    datosCanal.cantidad_clientes_canal += 1;
                    datosCanal.clientes_canal_list = new List<E_Cliente_Canal_Datos>();

                    E_Cliente_Canal_Datos clienteDatos = new E_Cliente_Canal_Datos();
                    clienteDatos.cliente_codigo = reporte.ges_cliente;
                    clienteDatos.cliente_prc_fecha = reporte.ges_prc_fecha;
                    clienteDatos.cliente_prc_contactado = reporte.ges_prc_contactado;

                    datosCanal.clientes_canal_list.Add(clienteDatos);
                    asesorDatos.clientes_activos += 1;
                    if (clienteDatos.cliente_prc_fecha.Date == DateTime.Now.Date)
                    {
                        asesorDatos.clientes_nuevos += 1;
                    }
                    asesorDatos.canales_clientes_list.Add(datosCanal);
                    rep.asesores_clientes_list.Add(asesorDatos);

                    datosReturn.Add(rep);
                
                }

            });
            return datosReturn;
        }

        private int verifyClientExists(E_Reporte_Prod_Ase_Datos usuario, E_Reporte_Productividad reporte)
        {
            int canal_codigo = 0;
            try
            {
                usuario.canales_clientes_list.ForEach(canal =>
                {
                    canal.clientes_canal_list.ForEach(cliente =>
                    {
                        if (cliente.cliente_codigo == reporte.ges_cliente)
                        {
                            canal_codigo = canal.canal.can_codigo;
                            throw new Exception("");
                        }
                    });
                });
            }
            catch (Exception ex)
            {

            }

            return canal_codigo;
        }
    }
}
