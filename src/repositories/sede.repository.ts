import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sede, SedeRelations, Ciudad, Sala, Administrador, Conductor} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {SalaRepository} from './sala.repository';
import {AdministradorRepository} from './administrador.repository';
import {ConductorRepository} from './conductor.repository';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.id,
  SedeRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Sede.prototype.id>;

  public readonly salas: HasManyRepositoryFactory<Sala, typeof Sede.prototype.id>;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Sede.prototype.id>;

  public readonly conductors: HasManyRepositoryFactory<Conductor, typeof Sede.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>,
  ) {
    super(Sede, dataSource);
    this.conductors = this.createHasManyRepositoryFactoryFor('conductors', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductors', this.conductors.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.salas = this.createHasManyRepositoryFactoryFor('salas', salaRepositoryGetter,);
    this.registerInclusionResolver('salas', this.salas.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
