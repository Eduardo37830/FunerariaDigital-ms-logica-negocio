import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {ClientePlan, ClientePlanRelations} from '../models';

export class ClientePlanRepository extends DefaultCrudRepository<
  ClientePlan,
  typeof ClientePlan.prototype.id,
  ClientePlanRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(ClientePlan, dataSource);
  }
}
