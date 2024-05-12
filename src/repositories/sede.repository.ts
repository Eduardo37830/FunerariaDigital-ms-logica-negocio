import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Administrador, Conductor, Sala, Sede, SedeRelations, Ciudad} from '../models';
import {AdministradorRepository} from './administrador.repository';
import {ConductorRepository} from './conductor.repository';
import {SalaRepository} from './sala.repository';
import {CiudadRepository} from './ciudad.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id,
  SedeRelations
> {

  public readonly salas: HasManyRepositoryFactory<Sala, typeof Sede.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Sede.prototype.id>;

  public readonly conductors: HasManyRepositoryFactory<Conductor, typeof Sede.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Sede.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Sede, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.conductors = this.createHasManyRepositoryFactoryFor('conductors', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductors', this.conductors.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.salas = this.createHasManyRepositoryFactoryFor('salas', salaRepositoryGetter,);
    this.registerInclusionResolver('salas', this.salas.inclusionResolver);
  }
}
