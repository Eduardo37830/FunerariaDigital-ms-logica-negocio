import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SalaChat, ServicioFunerario, SolicitudServicioFunerario, SolicitudServicioFunerarioRelations, Cliente} from '../models';
import {ComentarioRepository} from './comentario.repository';
import {SalaChatRepository} from './sala-chat.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';
import {ClienteRepository} from './cliente.repository';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly salaChats: HasManyRepositoryFactory<SalaChat, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly cliente: BelongsToAccessor<Cliente, typeof SolicitudServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('SalaChatRepository') protected salaChatRepositoryGetter: Getter<SalaChatRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(SolicitudServicioFunerario, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.salaChats = this.createHasManyRepositoryFactoryFor('salaChats', salaChatRepositoryGetter,);
    this.registerInclusionResolver('salaChats', this.salaChats.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
