import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {EstadoBeneficiario, EstadoBeneficiarioRelations} from '../models';

export class EstadoBeneficiarioRepository extends DefaultCrudRepository<
  EstadoBeneficiario,
  typeof EstadoBeneficiario.prototype.id,
  EstadoBeneficiarioRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(EstadoBeneficiario, dataSource);
  }
}
