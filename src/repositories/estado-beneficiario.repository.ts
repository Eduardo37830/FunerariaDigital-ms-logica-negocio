import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoBeneficiario, EstadoBeneficiarioRelations, Beneficiario} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';

export class EstadoBeneficiarioRepository extends DefaultCrudRepository<
  EstadoBeneficiario,
  typeof EstadoBeneficiario.prototype.id,
  EstadoBeneficiarioRelations
> {

  public readonly beneficiarios: HasManyRepositoryFactory<Beneficiario, typeof EstadoBeneficiario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(EstadoBeneficiario, dataSource);
    this.beneficiarios = this.createHasManyRepositoryFactoryFor('beneficiarios', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiarios', this.beneficiarios.inclusionResolver);
  }
}
