import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ServicioFunerario, ServicioFunerarioRelations, Sala, Conductor, EstadoServicio, SolicitudServicioFunerario} from '../models';
import {SalaRepository} from './sala.repository';
import {ConductorRepository} from './conductor.repository';
import {EstadoServicioRepository} from './estado-servicio.repository';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id,
  ServicioFunerarioRelations
> {

  public readonly sala: BelongsToAccessor<Sala, typeof ServicioFunerario.prototype.id>;

  public readonly conductor: BelongsToAccessor<Conductor, typeof ServicioFunerario.prototype.id>;

  public readonly estadoServicio: BelongsToAccessor<EstadoServicio, typeof ServicioFunerario.prototype.id>;

  public readonly solicitudServicioFunerario: BelongsToAccessor<SolicitudServicioFunerario, typeof ServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('EstadoServicioRepository') protected estadoServicioRepositoryGetter: Getter<EstadoServicioRepository>, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.solicitudServicioFunerario = this.createBelongsToAccessorFor('solicitudServicioFunerario', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerario', this.solicitudServicioFunerario.inclusionResolver);
    this.estadoServicio = this.createBelongsToAccessorFor('estadoServicio', estadoServicioRepositoryGetter,);
    this.registerInclusionResolver('estadoServicio', this.estadoServicio.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductor', this.conductor.inclusionResolver);
    this.sala = this.createBelongsToAccessorFor('sala', salaRepositoryGetter,);
    this.registerInclusionResolver('sala', this.sala.inclusionResolver);
  }
}
