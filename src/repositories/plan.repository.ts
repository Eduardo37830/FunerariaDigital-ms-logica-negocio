import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Plan, PlanRelations, Servicio, ServicioPlan, Administrador, Cliente, ClientePlan} from '../models';
import {ServicioPlanRepository} from './servicio-plan.repository';
import {ServicioRepository} from './servicio.repository';
import {AdministradorRepository} from './administrador.repository';
import {ClientePlanRepository} from './cliente-plan.repository';
import {ClienteRepository} from './cliente.repository';

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

  public readonly clientes: HasManyThroughRepositoryFactory<Cliente, typeof Cliente.prototype.id,
          ClientePlan,
          typeof Plan.prototype.id
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ServicioPlanRepository') protected servicioPlanRepositoryGetter: Getter<ServicioPlanRepository>, @repository.getter('ServicioRepository') protected servicioRepositoryGetter: Getter<ServicioRepository>, @repository.getter('AdministradorRepository') protected administradorRepositoryGetter: Getter<AdministradorRepository>, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Plan, dataSource);
    this.clientes = this.createHasManyThroughRepositoryFactoryFor('clientes', clienteRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
    this.administrador = this.createBelongsToAccessorFor('administrador', administradorRepositoryGetter,);
    this.registerInclusionResolver('administrador', this.administrador.inclusionResolver);
    this.servicios = this.createHasManyThroughRepositoryFactoryFor('servicios', servicioRepositoryGetter, servicioPlanRepositoryGetter,);
    this.registerInclusionResolver('servicios', this.servicios.inclusionResolver);
  }
}
