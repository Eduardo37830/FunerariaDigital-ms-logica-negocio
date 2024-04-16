import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Sede, SedeRelations} from '../models';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id,
  SedeRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Sede, dataSource);
  }
}
