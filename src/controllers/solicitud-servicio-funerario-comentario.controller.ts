import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudServicioFunerario,
  Comentario,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioComentarioController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/comentario', {
    responses: {
      '200': {
        description: 'Comentario belonging to SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comentario),
          },
        },
      },
    },
  })
  async getComentario(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
  ): Promise<Comentario> {
    return this.solicitudServicioFunerarioRepository.comentario(id);
  }
}
