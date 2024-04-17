import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sala, SalaRelations, ServicioFunerario, Sede} from '../models';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';
import {SedeRepository} from './sede.repository';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id,
  SalaRelations
> {

  public readonly servicioFunerarios: HasManyRepositoryFactory<ServicioFunerario, typeof Sala.prototype.id>;

  public readonly sede: BelongsToAccessor<Sede, typeof Sala.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Sala, dataSource);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
    this.servicioFunerarios = this.createHasManyRepositoryFactoryFor('servicioFunerarios', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerarios', this.servicioFunerarios.inclusionResolver);
  }
}
