import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, BeneficiarioRelations, Cliente, SolicitudServicioFunerario} from '../models';
import {ClienteRepository} from './cliente.repository';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class BeneficiarioRepository extends DefaultCrudRepository<
  Beneficiario,
  typeof Beneficiario.prototype.id,
  BeneficiarioRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Beneficiario.prototype.id>;

  public readonly solicitudServicioFunerarios: HasManyRepositoryFactory<SolicitudServicioFunerario, typeof Beneficiario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(Beneficiario, dataSource);
    this.solicitudServicioFunerarios = this.createHasManyRepositoryFactoryFor('solicitudServicioFunerarios', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerarios', this.solicitudServicioFunerarios.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
