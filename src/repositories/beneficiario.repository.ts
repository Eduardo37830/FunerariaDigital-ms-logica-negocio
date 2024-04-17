import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, EstadoBeneficiario, Cliente} from '../models';
import {EstadoBeneficiarioRepository} from './estado-beneficiario.repository';
import {ClienteRepository} from './cliente.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.id,
  BeneficiarioRelations
> {

  public readonly estadoBeneficiario: BelongsToAccessor<EstadoBeneficiario, typeof Beneficiario.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof Beneficiario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('EstadoBeneficiarioRepository') protected estadoBeneficiarioRepositoryGetter: Getter<EstadoBeneficiarioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.estadoBeneficiario = this.createBelongsToAccessorFor('estadoBeneficiario', estadoBeneficiarioRepositoryGetter,);
    this.registerInclusionResolver('estadoBeneficiario', this.estadoBeneficiario.inclusionResolver);
  }
}
