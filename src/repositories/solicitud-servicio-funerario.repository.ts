import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Beneficiario, SalaChat, ServicioFunerario, SolicitudServicioFunerario, SolicitudServicioFunerarioRelations} from '../models';
import {BeneficiarioRepository} from './beneficiario.repository';
import {ComentarioRepository} from './comentario.repository';
import {SalaChatRepository} from './sala-chat.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly salaChats: HasManyRepositoryFactory<SalaChat, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly beneficiario: BelongsToAccessor<Beneficiario, typeof SolicitudServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('SalaChatRepository') protected salaChatRepositoryGetter: Getter<SalaChatRepository>, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(SolicitudServicioFunerario, dataSource);
    this.beneficiario = this.createBelongsToAccessorFor('beneficiario', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiario', this.beneficiario.inclusionResolver);
    this.salaChats = this.createHasManyRepositoryFactoryFor('salaChats', salaChatRepositoryGetter,);
    this.registerInclusionResolver('salaChats', this.salaChats.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
