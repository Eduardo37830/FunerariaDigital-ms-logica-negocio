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
  SalaChat,
  SolicitudServicioFunerario,
} from '../models';
import {SalaChatRepository} from '../repositories';

export class SalaChatSolicitudServicioFunerarioController {
  constructor(
    @repository(SalaChatRepository) protected salaChatRepository: SalaChatRepository,
  ) { }

  @get('/sala-chats/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SalaChat has one SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudServicioFunerario),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<SolicitudServicioFunerario> {
    return this.salaChatRepository.solicitudServicioFunerario(id).get(filter);
  }

  @post('/sala-chats/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SalaChat model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SalaChat.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicioFunerarioInSalaChat',
            exclude: ['id'],
            optional: ['salaChatId']
          }),
        },
      },
    }) solicitudServicioFunerario: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    return this.salaChatRepository.solicitudServicioFunerario(id).create(solicitudServicioFunerario);
  }

  @patch('/sala-chats/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SalaChat.SolicitudServicioFunerario PATCH success count',
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
    return this.salaChatRepository.solicitudServicioFunerario(id).patch(solicitudServicioFunerario, where);
  }

  @del('/sala-chats/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SalaChat.SolicitudServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.salaChatRepository.solicitudServicioFunerario(id).delete(where);
  }
}
