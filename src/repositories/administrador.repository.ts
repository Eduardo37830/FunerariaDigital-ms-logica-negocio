import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Sede} from '../models';
import {SedeRepository} from './sede.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly sede: HasOneRepositoryFactory<Sede, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Administrador, dataSource);
    this.sede = this.createHasOneRepositoryFactoryFor('sede', sedeRepositoryGetter);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
