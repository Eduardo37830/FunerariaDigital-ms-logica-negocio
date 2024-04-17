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
  ServicioFunerario,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioServicioFunerarioController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository) protected solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of SolicitudServicioFunerario has many ServicioFunerario',
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
    return this.solicitudServicioFunerarioRepository.servicioFunerarios(id).find(filter);
  }

  @post('/solicitud-servicio-funerarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerarioInSolicitudServicioFunerario',
            exclude: ['id'],
            optional: ['solicitudServicioFunerarioId']
          }),
        },
      },
    }) servicioFunerario: Omit<ServicioFunerario, 'id'>,
  ): Promise<ServicioFunerario> {
    return this.solicitudServicioFunerarioRepository.servicioFunerarios(id).create(servicioFunerario);
  }

  @patch('/solicitud-servicio-funerarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario.ServicioFunerario PATCH success count',
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
    return this.solicitudServicioFunerarioRepository.servicioFunerarios(id).patch(servicioFunerario, where);
  }

  @del('/solicitud-servicio-funerarios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario.ServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.servicioFunerarios(id).delete(where);
  }
}
