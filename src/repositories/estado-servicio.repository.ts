import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoServicio, EstadoServicioRelations} from '../models';

export class EstadoServicioRepository extends DefaultCrudRepository<
  EstadoServicio,
  typeof EstadoServicio.prototype.id,
  EstadoServicioRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(EstadoServicio, dataSource);
  }
}
