import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {EstadoServicio, EstadoServicioRelations} from '../models';

export class EstadoServicioRepository extends DefaultCrudRepository<
  EstadoServicio,
  typeof EstadoServicio.prototype.id,
  EstadoServicioRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(EstadoServicio, dataSource);
  }
}
