import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClienteRelations, Plan, ClientePlan, SolicitudServicioFunerario} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {PlanRepository} from './plan.repository';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly plans: HasManyThroughRepositoryFactory<Plan, typeof Plan.prototype.id,
          ClientePlan,
          typeof Cliente.prototype.id
        >;

  public readonly solicitudServicioFunerarios: HasManyRepositoryFactory<SolicitudServicioFunerario, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.solicitudServicioFunerarios = this.createHasManyRepositoryFactoryFor('solicitudServicioFunerarios', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerarios', this.solicitudServicioFunerarios.inclusionResolver);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
