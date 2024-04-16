import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.idBeneficiario,
  BeneficiarioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Beneficiario.prototype.idBeneficiario>;

  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
