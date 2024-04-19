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
  Comentario,
  ServicioFunerario,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioServicioFunerarioController {
  constructor(
    @repository(ComentarioRepository) protected comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Comentario has many ServicioFunerario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ServicioFunerario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ServicioFunerario>,
  ): Promise<ServicioFunerario[]> {
    return this.comentarioRepository.servicioFunerarios(id).find(filter);
  }

  @post('/comentarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Comentario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comentario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerarioInComentario',
            exclude: ['id'],
            optional: ['comentarioId']
          }),
        },
      },
    }) servicioFunerario: Omit<ServicioFunerario, 'id'>,
  ): Promise<ServicioFunerario> {
    return this.comentarioRepository.servicioFunerarios(id).create(servicioFunerario);
  }

  @patch('/comentarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Comentario.ServicioFunerario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {partial: true}),
        },
      },
    })
    servicioFunerario: Partial<ServicioFunerario>,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.comentarioRepository.servicioFunerarios(id).patch(servicioFunerario, where);
  }

  @del('/comentarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Comentario.ServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.comentarioRepository.servicioFunerarios(id).delete(where);
  }
}
