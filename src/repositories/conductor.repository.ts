import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, ConductorRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Conductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Conductor, dataSource);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
