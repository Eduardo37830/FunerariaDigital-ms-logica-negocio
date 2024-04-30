import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sala, SalaRelations, Sede, ServicioFunerario} from '../models';
import {SedeRepository} from './sede.repository';
import {ServicioFunerarioRepository} from './servicio-funerario.repository';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id,
  SalaRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Sala.prototype.id>

  public readonly servicioFunerario: BelongsToAccessor<ServicioFunerario, typeof Sala.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('ServicioFunerarioRepository') protected servicioFunerarioRepositoryGetter: Getter<ServicioFunerarioRepository>,
  ) {
    super(Sala, dataSource);
    this.servicioFunerario = this.createBelongsToAccessorFor('servicioFunerario', servicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('servicioFunerario', this.servicioFunerario.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
