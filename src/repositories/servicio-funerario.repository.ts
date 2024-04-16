import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {ServicioFunerario, ServicioFunerarioRelations} from '../models';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id,
  ServicioFunerarioRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(ServicioFunerario, dataSource);
  }
}
