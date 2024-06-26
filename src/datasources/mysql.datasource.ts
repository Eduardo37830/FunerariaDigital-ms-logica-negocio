import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  /*name: ConfiguracionSeguridad.mysqlName,
  connector: ConfiguracionSeguridad.mysqlConnector,
  host: ConfiguracionSeguridad.mysqlConnectionString,
  port: ConfiguracionSeguridad.mysqlPort,
  user: ConfiguracionSeguridad.mysqlUser,
  password: ConfiguracionSeguridad.mysqlPassword,
  database: ConfiguracionSeguridad.mysqlDatabase,*/
  name: 'mysql',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Jorge1002671250',
  database: 'funerariadigital'
};

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
