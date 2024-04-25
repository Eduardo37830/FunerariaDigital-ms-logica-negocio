import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, EstadoServicio, Sala, ServicioFunerario, ServicioFunerarioRelations, SolicitudServicioFunerario} from '../models';
import {ConductorRepository} from './conductor.repository';
import {EstadoServicioRepository} from './estado-servicio.repository';
import {SalaRepository} from './sala.repository';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id,
  ServicioFunerarioRelations
> {


  public readonly conductor: BelongsToAccessor<Conductor, typeof ServicioFunerario.prototype.id>;

  public readonly estadoServicio: BelongsToAccessor<EstadoServicio, typeof ServicioFunerario.prototype.id>;

  public readonly solicitudServicioFunerario: BelongsToAccessor<SolicitudServicioFunerario, typeof ServicioFunerario.prototype.id>;

  public readonly sala: BelongsToAccessor<Sala, typeof ServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('EstadoServicioRepository') protected estadoServicioRepositoryGetter: Getter<EstadoServicioRepository>, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.sala = this.createBelongsToAccessorFor('sala', salaRepositoryGetter,);
    this.registerInclusionResolver('sala', this.sala.inclusionResolver);
    this.solicitudServicioFunerario = this.createBelongsToAccessorFor('solicitudServicioFunerario', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerario', this.solicitudServicioFunerario.inclusionResolver);
    this.estadoServicio = this.createBelongsToAccessorFor('estadoServicio', estadoServicioRepositoryGetter,);
    this.registerInclusionResolver('estadoServicio', this.estadoServicio.inclusionResolver);
    this.conductor = this.createBelongsToAccessorFor('conductor', conductorRepositoryGetter,);
  }
}
