import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, EstadoBeneficiario} from '../models';
import {EstadoBeneficiarioRepository} from './estado-beneficiario.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.id,
  BeneficiarioRelations
> {

  public readonly estadoBeneficiario: BelongsToAccessor<EstadoBeneficiario, typeof Beneficiario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EstadoBeneficiarioRepository') protected estadoBeneficiarioRepositoryGetter: Getter<EstadoBeneficiarioRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.estadoBeneficiario = this.createBelongsToAccessorFor('estadoBeneficiario', estadoBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('estadoBeneficiario', this.estadoBeneficiario.inclusionResolver);
  }
}
