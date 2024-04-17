import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {EstadoServicio, EstadoServicioRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class EstadoServicioRepository extends DefaultCrudRepository<
  EstadoServicio,
  typeof EstadoServicio.prototype.id,
  EstadoServicioRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof EstadoServicio.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(EstadoServicio, dataSource);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
