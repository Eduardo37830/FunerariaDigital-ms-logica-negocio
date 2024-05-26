import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {GenerarPqrs, GenerarPqrsRelations} from '../models';

export class GenerarPqrsRepository extends DefaultCrudRepository<
  GenerarPqrs,
  typeof GenerarPqrs.prototype.id,
  GenerarPqrsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(GenerarPqrs, dataSource);
  }
}
