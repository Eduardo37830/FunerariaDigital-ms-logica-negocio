import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Servicio, ServicioPlan, Administrador} from '../models';
import {ServicioPlanRepository} from './servicio-plan.repository';
import {ServicioRepository} from './servicio.repository';
import {AdministradorRepository} from './administrador.repository';

export class PlanRepository extends DefaultCrudRepository<
  Plan,
  typeof Plan.prototype.id,
  PlanRelations
> {

  public readonly servicios: HasManyThroughRepositoryFactory<Servicio, typeof Servicio.prototype.id,
          ServicioPlan,
          typeof Plan.prototype.id
        >;

  public readonly administrador: BelongsToAccessor<Administrador, typeof Plan.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioPlanRepository') protected servicioPlanRepositoryGetter: Getter<ServicioPlanRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>,
  ) {
    super(Plan, dataSource);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', servicioRepositoryGetter, servicioPlanRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
