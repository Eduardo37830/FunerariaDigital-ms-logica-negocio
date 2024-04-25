import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Servicio, ServicioRelations, Plan, ServicioPlan} from '../models';
import {ServicioPlanRepository} from './servicio-plan.repository';
import {PlanRepository} from './plan.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          ServicioPlan,
          typeof Servicio.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioPlanRepository') protected servicioPlanRepositoryGetter: Getter<ServicioPlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>,
  ) {
    super(Servicio, dataSource);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, servicioPlanRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
