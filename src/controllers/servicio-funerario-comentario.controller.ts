import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ServicioFunerario,
  Comentario,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioComentarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/comentario', {
    responses: {
      '200': {
        description: 'Comentario belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Comentario),
          },
        },
      },
    },
  })
  async getComentario(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
  ): Promise<Comentario> {
    return this.servicioFunerarioRepository.comentario(id);
  }
}
