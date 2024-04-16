import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {ServicioPlan, ServicioPlanRelations} from '../models';

export class ServicioPlanRepository extends DefaultCrudRepository<
  ServicioPlan,
  typeof ServicioPlan.prototype.id,
  ServicioPlanRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(ServicioPlan, dataSource);
  }
}
