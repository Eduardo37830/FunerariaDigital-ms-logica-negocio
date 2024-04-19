import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, SalaChat, ServicioFunerario, SolicitudServicioFunerario, SolicitudServicioFunerarioRelations} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ComentarioRepository} from './comentario.repository';
import {SalaChatRepository} from './sala-chat.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly salaChat: BelongsToAccessor<SalaChat, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('SalaChatRepository') protected salaChatRepositoryGetter: Getter<SalaChatRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(SolicitudServicioFunerario, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.salaChat = this.createBelongsToAccessorFor('salaChat', salaChatRepositoryGetter,);
    this.registerInclusionResolver('salaChat', this.salaChat.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
