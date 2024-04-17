import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Sede, Plan} from '../models';
import {SedeRepository} from './sede.repository';
import {PlanRepository} from './plan.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly sede: HasOneRepositoryFactory<Sede, typeof Administrador.prototype.id>;

  public readonly plans: HasManyRepositoryFactory<Plan, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Administrador, dataSource);
    this.plans = this.createHasManyRepositoryFactoryFor('plans', planRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
    this.sede = this.createHasOneRepositoryFactoryFor('sede', sedeRepositoryGetter);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
