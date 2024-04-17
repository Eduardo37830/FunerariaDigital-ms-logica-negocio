import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Comentario, ComentarioRelations, SolicitudServicioFunerario} from '../models';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.id,
  ComentarioRelations
> {

  public readonly solicitudServicioFunerarios: HasManyRepositoryFactory<SolicitudServicioFunerario, typeof Comentario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(Comentario, dataSource);
    this.solicitudServicioFunerarios = this.createHasManyRepositoryFactoryFor('solicitudServicioFunerarios', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerarios', this.solicitudServicioFunerarios.inclusionResolver);
  }
}
