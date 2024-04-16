import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {ConfiguracionSeguridad} from '../config/seguridad.config';

const config = {
  name: "mysql",
  connector: ConfiguracionSeguridad.mysqlConnector,
  url: ConfiguracionSeguridad.mysqlConnectionString,
  port: ConfiguracionSeguridad.mysqlPort,
  user: ConfiguracionSeguridad.mysqlUser,
  password: ConfiguracionSeguridad.mysqlPassword,
  database: ConfiguracionSeguridad.mysqlDatabase,
};

/* const config = {
  name: "mysql",
  connector: "mysql",
  url: "mysqlaws.cfauaecs6vva.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "admin",
  password: "N0qC697G6C8O",
  database: "funerariadb",
}; */

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MysqlDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mysql';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mysql', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
