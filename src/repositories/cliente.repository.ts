import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Cliente, ClienteRelations, Beneficiario} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly beneficiarios: HasManyRepositoryFactory<Beneficiario, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.beneficiarios = this.createHasManyRepositoryFactoryFor('beneficiarios', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiarios', this.beneficiarios.inclusionResolver);
  }
}
