import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sala, SalaRelations, Sede} from '../models';
import {SedeRepository} from './sede.repository';

export class SalaRepository extends DefaultCrudRepository<
  Sala,
  typeof Sala.prototype.id,
  SalaRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Sala.prototype.id>


  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>,
  ) {
    super(Sala, dataSource);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
