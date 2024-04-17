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
  SolicitudServicioFunerario,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioSolicitudServicioFunerarioController {
  constructor(
    @repository(ComentarioRepository) protected comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Comentario has many SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudServicioFunerario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<SolicitudServicioFunerario[]> {
    return this.comentarioRepository.solicitudServicioFunerarios(id).find(filter);
  }

  @post('/comentarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Comentario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Comentario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicioFunerarioInComentario',
            exclude: ['id'],
            optional: ['comentarioId']
          }),
        },
      },
    }) solicitudServicioFunerario: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    return this.comentarioRepository.solicitudServicioFunerarios(id).create(solicitudServicioFunerario);
  }

  @patch('/comentarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Comentario.SolicitudServicioFunerario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {partial: true}),
        },
      },
    })
    solicitudServicioFunerario: Partial<SolicitudServicioFunerario>,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.comentarioRepository.solicitudServicioFunerarios(id).patch(solicitudServicioFunerario, where);
  }

  @del('/comentarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Comentario.SolicitudServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.comentarioRepository.solicitudServicioFunerarios(id).delete(where);
  }
}
