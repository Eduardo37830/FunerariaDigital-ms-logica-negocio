import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sala, SalaRelations, ServicioFunerario} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id,
  SalaRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Sala.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Sala, dataSource);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
