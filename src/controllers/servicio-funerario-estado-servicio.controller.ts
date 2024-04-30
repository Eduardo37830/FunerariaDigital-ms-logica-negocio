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
  EstadoServicio,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioEstadoServicioController {
  constructor(
    @repository(ServicioFunerarioRepository) protected servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/estado-servicios', {
    responses: {
      '200': {
        description: 'Array of ServicioFunerario has many EstadoServicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(EstadoServicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<EstadoServicio>,
  ): Promise<EstadoServicio[]> {
    return this.servicioFunerarioRepository.estadoServicios(id).find(filter);
  }

  @post('/servicio-funerarios/{id}/estado-servicios', {
    responses: {
      '200': {
        description: 'ServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoServicio)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoServicio, {
            title: 'NewEstadoServicioInServicioFunerario',
            exclude: ['id'],
            optional: ['servicioFunerarioId']
          }),
        },
      },
    }) estadoServicio: Omit<EstadoServicio, 'id'>,
  ): Promise<EstadoServicio> {
    return this.servicioFunerarioRepository.estadoServicios(id).create(estadoServicio);
  }

  @patch('/servicio-funerarios/{id}/estado-servicios', {
    responses: {
      '200': {
        description: 'ServicioFunerario.EstadoServicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoServicio, {partial: true}),
        },
      },
    })
    estadoServicio: Partial<EstadoServicio>,
    @param.query.object('where', getWhereSchemaFor(EstadoServicio)) where?: Where<EstadoServicio>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.estadoServicios(id).patch(estadoServicio, where);
  }

  @del('/servicio-funerarios/{id}/estado-servicios', {
    responses: {
      '200': {
        description: 'ServicioFunerario.EstadoServicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(EstadoServicio)) where?: Where<EstadoServicio>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.estadoServicios(id).delete(where);
  }
}
