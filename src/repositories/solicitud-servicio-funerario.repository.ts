import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {SolicitudServicioFunerario, SolicitudServicioFunerarioRelations} from '../models';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(SolicitudServicioFunerario, dataSource);
  }
}
