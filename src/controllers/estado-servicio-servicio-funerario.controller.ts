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
  EstadoServicio,
  ServicioFunerario,
} from '../models';
import {EstadoServicioRepository} from '../repositories';

export class EstadoServicioServicioFunerarioController {
  constructor(
    @repository(EstadoServicioRepository) protected estadoServicioRepository: EstadoServicioRepository,
  ) { }

  @get('/estado-servicios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of EstadoServicio has many ServicioFunerario',
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
    return this.estadoServicioRepository.servicioFunerarios(id).find(filter);
  }

  @post('/estado-servicios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'EstadoServicio model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoServicio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerarioInEstadoServicio',
            exclude: ['id'],
            optional: ['estadoServicioId']
          }),
        },
      },
    }) servicioFunerario: Omit<ServicioFunerario, 'id'>,
  ): Promise<ServicioFunerario> {
    return this.estadoServicioRepository.servicioFunerarios(id).create(servicioFunerario);
  }

  @patch('/estado-servicios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'EstadoServicio.ServicioFunerario PATCH success count',
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
    return this.estadoServicioRepository.servicioFunerarios(id).patch(servicioFunerario, where);
  }

  @del('/estado-servicios/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'EstadoServicio.ServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.estadoServicioRepository.servicioFunerarios(id).delete(where);
  }
}
