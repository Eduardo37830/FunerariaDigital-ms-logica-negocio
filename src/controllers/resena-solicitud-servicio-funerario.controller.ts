import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Resena,
  SolicitudServicioFunerario,
} from '../models';
import {ResenaRepository} from '../repositories';

export class ResenaSolicitudServicioFunerarioController {
  constructor(
    @repository(ResenaRepository)
    public resenaRepository: ResenaRepository,
  ) { }

  @get('/resenas/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario belonging to Resena',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudServicioFunerario),
          },
        },
      },
    },
  })
  async getSolicitudServicioFunerario(
    @param.path.string('id') id: typeof Resena.prototype.id,
  ): Promise<SolicitudServicioFunerario> {
    return this.resenaRepository.ResenaSolicitud(id);
  }
}
