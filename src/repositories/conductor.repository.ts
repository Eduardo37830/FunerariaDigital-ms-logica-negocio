import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, ConductorRelations, Sede, ServicioFunerario} from '../models';
import {SedeRepository} from './sede.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class ConductorRepository extends DefaultCrudRepository<
  Conductor,
  typeof Conductor.prototype.id,
  ConductorRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Conductor.prototype.id>;

  public readonly servicioFunerario: BelongsToAccessor<ServicioFunerario, typeof Conductor.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Conductor, dataSource);
    this.servicioFunerario = this.createBelongsToAccessorFor('servicioFunerario', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerario', this.servicioFunerario.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
