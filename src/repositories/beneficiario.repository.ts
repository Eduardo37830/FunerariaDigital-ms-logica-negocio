import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations} from '../models';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Beneficiario, dataSource);
  }
}
