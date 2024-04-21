import * as dotenv from 'dotenv';
dotenv.config();

export namespace ConfiguracionSeguridad {

  // Menu que necesitamos que tengan una verificacion crud de que permisos poseen
  export const menuPlanId = "";
  export const menuClienteId = "";
  export const menuServicioFunerarioId = "";
  export const menuAdquisionPlanId = ""; //ClientePlan
  export const menuCiudadId = "";
  export const menuDepartamentoId = "";
  export const menuSedeId = "";
  export const menuSalaId = "";
  export const meenuBeneficiarioId = "";
  export const menuEstadoBeneficiarioId = "";
  export const menuComentarioId = "";
  export const menuSalaChatId = "";
  export const menuServicioPlanId = "";
  export const menuServicioId = "";
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
