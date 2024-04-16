import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Sala, SalaRelations} from '../models';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id,
  SalaRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Sala, dataSource);
  }
}
