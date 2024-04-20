import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SalaChat, SalaChatRelations, SolicitudServicioFunerario} from '../models';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class SalaChatRepository extends DefaultCrudRepository<
  SalaChat,
  typeof SalaChat.prototype.id,
  SalaChatRelations
> {

  public readonly solicitudServicioFunerario: BelongsToAccessor<SolicitudServicioFunerario, typeof SalaChat.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(SalaChat, dataSource);
    this.solicitudServicioFunerario = this.createBelongsToAccessorFor('solicitudServicioFunerario', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerario', this.solicitudServicioFunerario.inclusionResolver);
  }
}
