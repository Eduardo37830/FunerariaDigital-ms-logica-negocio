import * as dotenv from 'dotenv';
dotenv.config();

export namespace ConfiguracionSeguridad {

  // Menu que necesitamos que tengan una verificacion crud de que permisos poseen
  export const menuPlanId = "6619ad7fc9589938bc89c3e7";
  export const menuClienteId = "6619ac9fc9589938bc89c3e4";
  export const menuServicioFunerarioId = "66216ce8415cd3feff84ba02";
  export const menuEstadoServicioFunerarioId = "66216d3c415cd3feff84ba04";
  export const menuAdquisionPlanId = "662125b159a039f4c4176e40"; //ClientePlan
  export const menuCiudadId = "662124f959a039f4c4176e3e";
  export const menuDepartamentoId = "6621251c59a039f4c4176e3f";
  export const menuSedeId = "66216c3f415cd3feff84b9fd";
  export const menuSalaId = "66216c62415cd3feff84b9fe";
  export const menuBeneficiarioId = "66216c80415cd3feff84b9ff";
  export const menuComentarioId = "66216cbe415cd3feff84ba01";
  export const menuSalaChatId = "66216d74415cd3feff84ba05";
  export const menuServicioPlanId = "66216dcd415cd3feff84ba06";
  export const menuServicioId = "66216de9415cd3feff84ba07";
  export const SolicitudServicioFunerarioId = "66216d0c415cd3feff84ba03";



  // Enlazamiento a ms-seguridad y CRUD
  export const listarAccion = "listar";
  export const guardarAccion = "guardar";
  export const editarAccion = "editar";
  export const eliminarAccion = "eliminar";
  export const descargarAccion = "descargar";
  export const enlaceMicroservicioSeguridad = "http://localhost:3000/";

  // Enlaczamiento a la base de datos de ms-logica-negocio en MySQL
  export const mysqlName = process.env.DB_NAME;
  export const mysqlConnector = process.env.DB_CONNECTOR;
  export const mysqlConnectionString = process.env.DB_HOST;
  export const mysqlPort = process.env.DB_PORT;
  export const mysqlUser = process.env.DB_USER;
  export const mysqlPassword = process.env.DB_PASSWORD;
  export const mysqlDatabase = process.env.DB_DATABASE;
}
