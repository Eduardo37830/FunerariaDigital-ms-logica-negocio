import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, SalaChat, ServicioFunerario, SolicitudServicioFunerario, SolicitudServicioFunerarioRelations} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ComentarioRepository} from './comentario.repository';
import {SalaChatRepository} from './sala-chat.repository';
import {SalaRepository} from './sala.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly salaChats: HasManyRepositoryFactory<SalaChat, typeof SolicitudServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('SalaChatRepository') protected salaChatRepositoryGetter: Getter<SalaChatRepository>, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>,
  ) {
    super(SolicitudServicioFunerario, dataSource);
    this.salaChats = this.createHasManyRepositoryFactoryFor('salaChats', salaChatRepositoryGetter,);
    this.registerInclusionResolver('salaChats', this.salaChats.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
