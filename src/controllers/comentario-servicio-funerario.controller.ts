import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comentario,
  ServicioFunerario,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioServicioFunerarioController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/servicio-funerario', {
    responses: {
      '200': {
        description: 'ServicioFunerario belonging to Comentario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario),
          },
        },
      },
    },
  })
  async getServicioFunerario(
    @param.path.number('id') id: typeof Comentario.prototype.id,
  ): Promise<ServicioFunerario> {
    return this.comentarioRepository.servicioFunerario(id);
  }
}
