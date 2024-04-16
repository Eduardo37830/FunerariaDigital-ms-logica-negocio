import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Departamento, DepartamentoRelations} from '../models';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Departamento, dataSource);
  }
}
