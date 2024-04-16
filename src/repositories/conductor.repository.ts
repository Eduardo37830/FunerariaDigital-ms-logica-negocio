import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Conductor, ConductorRelations} from '../models';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Conductor, dataSource);
  }
}
