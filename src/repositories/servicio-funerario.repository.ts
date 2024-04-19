import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Conductor, EstadoServicio, Sala, ServicioFunerario, ServicioFunerarioRelations, SolicitudServicioFunerario, Comentario} from '../models';
import {ComentarioRepository} from './comentario.repository';
import {ConductorRepository} from './conductor.repository';
import {EstadoServicioRepository} from './estado-servicio.repository';
import {SalaRepository} from './sala.repository';
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

  public readonly comentario: BelongsToAccessor<Comentario, typeof ServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('EstadoServicioRepository') protected estadoServicioRepositoryGetter: Getter<EstadoServicioRepository>, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.comentario = this.createBelongsToAccessorFor('comentario', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentario', this.comentario.inclusionResolver);
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
