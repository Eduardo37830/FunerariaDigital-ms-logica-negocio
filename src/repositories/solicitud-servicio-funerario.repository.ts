import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SolicitudServicioFunerario, SolicitudServicioFunerarioRelations, ServicioFunerario, Comentario, SalaChat} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';
import {ComentarioRepository} from './comentario.repository';
import {SalaChatRepository} from './sala-chat.repository';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly comentario: BelongsToAccessor<Comentario, typeof SolicitudServicioFunerario.prototype.id>;

  public readonly salaChat: BelongsToAccessor<SalaChat, typeof SolicitudServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('SalaChatRepository') protected salaChatRepositoryGetter: Getter<SalaChatRepository>,
  ) {
    super(SolicitudServicioFunerario, dataSource);
    this.salaChat = this.createBelongsToAccessorFor('salaChat', salaChatRepositoryGetter,);
    this.registerInclusionResolver('salaChat', this.salaChat.inclusionResolver);
    this.comentario = this.createBelongsToAccessorFor('comentario', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentario', this.comentario.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
