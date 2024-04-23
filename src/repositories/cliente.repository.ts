import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Cliente, ClientePlan, ClienteRelations, Plan, SolicitudServicioFunerario, Beneficiario} from '../models';
import {ClientePlanRepository} from './cliente-plan.repository';
import {PlanRepository} from './plan.repository';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';
import {BeneficiarioRepository} from './beneficiario.repository';

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

  public readonly beneficiarios: HasManyRepositoryFactory<Beneficiario, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ClientePlanRepository') protected clientePlanRepositoryGetter: Getter<ClientePlanRepository>, @repository.getter('PlanRepository') protected planRepositoryGetter: Getter<PlanRepository>, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('BeneficiarioRepository') protected beneficiarioRepositoryGetter: Getter<BeneficiarioRepository>,
  ) {
    super(Cliente, dataSource);
    this.beneficiarios = this.createHasManyRepositoryFactoryFor('beneficiarios', beneficiarioRepositoryGetter,);
    this.registerInclusionResolver('beneficiarios', this.beneficiarios.inclusionResolver);
    this.solicitudServicioFunerarios = this.createHasManyRepositoryFactoryFor('solicitudServicioFunerarios', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerarios', this.solicitudServicioFunerarios.inclusionResolver);
    this.plans = this.createHasManyThroughRepositoryFactoryFor('plans', planRepositoryGetter, clientePlanRepositoryGetter,);
    this.registerInclusionResolver('plans', this.plans.inclusionResolver);
  }
}
