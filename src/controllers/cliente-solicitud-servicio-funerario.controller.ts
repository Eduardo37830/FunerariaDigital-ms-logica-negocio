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
  Cliente,
  SolicitudServicioFunerario,
} from '../models';
import {ClienteRepository, SolicitudServicioFunerarioRepository} from '../repositories';

export class ClienteSolicitudServicioFunerarioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
    @repository(SolicitudServicioFunerarioRepository) protected solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudServicioFunerario',
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
    return this.clienteRepository.solicitudServicioFunerarios(id).find(filter);
  }

  @get('/listar-solicitudes', {
    responses: {
      '200': {
        description: 'Array of all SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudServicioFunerario)},
          },
        },
      },
    },
  })
  async listarTodasSolicitudes(
    @param.query.object('filter') filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<SolicitudServicioFunerario[]> {
    return this.solicitudServicioFunerarioRepository.find(filter);
  }

  @post('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicioFunerarioInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudServicioFunerario: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    return this.clienteRepository.solicitudServicioFunerarios(id).create(solicitudServicioFunerario);
  }

  @patch('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudServicioFunerario PATCH success count',
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
    return this.clienteRepository.solicitudServicioFunerarios(id).patch(solicitudServicioFunerario, where);
  }

  @del('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudServicioFunerarios(id).delete(where);
  }
}
