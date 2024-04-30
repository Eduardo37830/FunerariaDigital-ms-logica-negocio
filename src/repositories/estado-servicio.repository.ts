import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoServicio, EstadoServicioRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class EstadoServicioRepository extends DefaultCrudRepository<
  EstadoServicio,
  typeof EstadoServicio.prototype.id,
  EstadoServicioRelations
> {

  public readonly servicioFunerario: BelongsToAccessor<ServicioFunerario, typeof EstadoServicio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(EstadoServicio, dataSource);
    this.servicioFunerario = this.createBelongsToAccessorFor('servicioFunerario', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerario', this.servicioFunerario.inclusionResolver);
  }
}
