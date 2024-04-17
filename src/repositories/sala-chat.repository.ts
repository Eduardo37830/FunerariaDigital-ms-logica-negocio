import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SalaChat, SalaChatRelations, SolicitudServicioFunerario} from '../models';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class SalaChatRepository extends DefaultCrudRepository<
  SalaChat,
  typeof SalaChat.prototype.id,
  SalaChatRelations
> {

  public readonly solicitudServicioFunerario: HasOneRepositoryFactory<SolicitudServicioFunerario, typeof SalaChat.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(SalaChat, dataSource);
    this.solicitudServicioFunerario = this.createHasOneRepositoryFactoryFor('solicitudServicioFunerario', solicitudServicioFunerarioRepositoryGetter);
    this.registerInclusionResolver('solicitudServicioFunerario', this.solicitudServicioFunerario.inclusionResolver);
  }
}
