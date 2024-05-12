import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Comentario, Conductor, EstadoServicio, ServicioFunerario, ServicioFunerarioRelations, SolicitudServicioFunerario, Sala} from '../models';
import {ComentarioRepository} from './comentario.repository';
import {ConductorRepository} from './conductor.repository';
import {EstadoServicioRepository} from './estado-servicio.repository';
import {SolicitudServicioFunerarioRepository} from './solicitud-servicio-funerario.repository';
import {SalaRepository} from './sala.repository';

export class ServicioFunerarioRepository extends DefaultCrudRepository<
  ServicioFunerario,
  typeof ServicioFunerario.prototype.id,
  ServicioFunerarioRelations
> {

  public readonly solicitudServicioFunerario: BelongsToAccessor<SolicitudServicioFunerario, typeof ServicioFunerario.prototype.id>;

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof ServicioFunerario.prototype.id>;

  public readonly conductors: HasManyRepositoryFactory<Conductor, typeof ServicioFunerario.prototype.id>;

  public readonly estadoServicios: HasManyRepositoryFactory<EstadoServicio, typeof ServicioFunerario.prototype.id>;

  public readonly sala: BelongsToAccessor<Sala, typeof ServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudServicioFunerarioRepository') protected solicitudServicioFunerarioRepositoryGetter: Getter<SolicitudServicioFunerarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('ConductorRepository') protected conductorRepositoryGetter: Getter<ConductorRepository>, @repository.getter('EstadoServicioRepository') protected estadoServicioRepositoryGetter: Getter<EstadoServicioRepository>, @repository.getter('SalaRepository') protected salaRepositoryGetter: Getter<SalaRepository>,
  ) {
    super(ServicioFunerario, dataSource);
    this.sala = this.createBelongsToAccessorFor('sala', salaRepositoryGetter,);
    this.registerInclusionResolver('sala', this.sala.inclusionResolver);
    this.estadoServicios = this.createHasManyRepositoryFactoryFor('estadoServicios', estadoServicioRepositoryGetter,);
    this.registerInclusionResolver('estadoServicios', this.estadoServicios.inclusionResolver);
    this.conductors = this.createHasManyRepositoryFactoryFor('conductors', conductorRepositoryGetter,);
    this.registerInclusionResolver('conductors', this.conductors.inclusionResolver);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
    this.solicitudServicioFunerario = this.createBelongsToAccessorFor('solicitudServicioFunerario', solicitudServicioFunerarioRepositoryGetter,);
    this.registerInclusionResolver('solicitudServicioFunerario', this.solicitudServicioFunerario.inclusionResolver);
  }
}
