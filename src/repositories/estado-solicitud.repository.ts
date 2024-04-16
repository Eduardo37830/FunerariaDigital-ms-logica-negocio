import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {EstadoSolicitud, EstadoSolicitudRelations} from '../models';

export class EstadoSolicitudRepository extends DefaultCrudRepository<
  EstadoSolicitud,
  typeof EstadoSolicitud.prototype.id,
  EstadoSolicitudRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(EstadoSolicitud, dataSource);
  }
}
