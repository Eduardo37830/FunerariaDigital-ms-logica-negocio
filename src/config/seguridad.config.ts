export namespace ConfiguracionSeguridad {
  export const mysqlName = process.env.DB_NAME;
  export const mysqlConnector = process.env.DB_CONNECTOR;
  export const mysqlConnectionString = process.env.DB_HOST;
  export const mysqlPort = process.env.DB_PORT;
  export const mysqlUser = process.env.DB_USER;
  export const mysqlPassword = process.env.DB_PASSWORD;
  export const mysqlDatabase = process.env.DB_DATABASE;
}
