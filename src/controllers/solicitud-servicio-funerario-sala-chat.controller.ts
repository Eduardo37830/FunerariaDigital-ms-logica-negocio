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
  SolicitudServicioFunerario,
  SalaChat,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioSalaChatController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository) protected solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/sala-chats', {
    responses: {
      '200': {
        description: 'Array of SolicitudServicioFunerario has many SalaChat',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SalaChat)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SalaChat>,
  ): Promise<SalaChat[]> {
    return this.solicitudServicioFunerarioRepository.salaChats(id).find(filter);
  }

  @post('/solicitud-servicio-funerarios/{id}/sala-chats', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SalaChat)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaChat, {
            title: 'NewSalaChatInSolicitudServicioFunerario',
            exclude: ['id'],
            optional: ['solicitudServicioFunerarioId']
          }),
        },
      },
    }) salaChat: Omit<SalaChat, 'id'>,
  ): Promise<SalaChat> {
    return this.solicitudServicioFunerarioRepository.salaChats(id).create(salaChat);
  }

  @patch('/solicitud-servicio-funerarios/{id}/sala-chats', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario.SalaChat PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaChat, {partial: true}),
        },
      },
    })
    salaChat: Partial<SalaChat>,
    @param.query.object('where', getWhereSchemaFor(SalaChat)) where?: Where<SalaChat>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.salaChats(id).patch(salaChat, where);
  }

  @del('/solicitud-servicio-funerarios/{id}/sala-chats', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario.SalaChat DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SalaChat)) where?: Where<SalaChat>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.salaChats(id).delete(where);
  }
}
