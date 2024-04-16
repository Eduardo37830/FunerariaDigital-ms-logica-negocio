import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Resena, ResenaRelations, SolicitudServicioFunerario} from '../models';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class ResenaRepository extends DefaultCrudRepository<
  Resena,
  typeof Resena.prototype.id,
  ResenaRelations
> {

  public readonly ResenaSolicitud: BelongsToAccessor<SolicitudServicioFunerario, typeof Resena.prototype.id>;

  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(Resena, dataSource);
    this.ResenaSolicitud = this.createBelongsToAccessorFor('ResenaSolicitud', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('ResenaSolicitud', this.ResenaSolicitud.inclusionResolver);
  }
}
