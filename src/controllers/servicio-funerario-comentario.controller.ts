import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  ServicioFunerario,
  Comentario,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioComentarioController {
  constructor(
    @repository(ServicioFunerarioRepository) protected servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of ServicioFunerario has many Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.servicioFunerarioRepository.comentarios(id).find(filter);
  }

  @post('/servicio-funerarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'ServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInServicioFunerario',
            exclude: ['id'],
            optional: ['servicioFunerarioId']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'id'>,
  ): Promise<Comentario> {
    return this.servicioFunerarioRepository.comentarios(id).create(comentario);
  }

  @patch('/servicio-funerarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Partial<Comentario>,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.comentarios(id).patch(comentario, where);
  }

  @del('/servicio-funerarios/{id}/comentarios', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.comentarios(id).delete(where);
  }
}
