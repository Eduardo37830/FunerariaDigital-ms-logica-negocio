import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EstadoServicio} from '../models';
import {EstadoServicioRepository} from '../repositories';

export class EstadoServicioController {
  constructor(
    @repository(EstadoServicioRepository)
    public estadoServicioRepository : EstadoServicioRepository,
  ) {}

  @post('/estado-servicio')
  @response(200, {
    description: 'EstadoServicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoServicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoServicio, {
            title: 'NewEstadoServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoServicio: Omit<EstadoServicio, 'id'>,
  ): Promise<EstadoServicio> {
    return this.estadoServicioRepository.create(estadoServicio);
  }

  @get('/estado-servicio/count')
  @response(200, {
    description: 'EstadoServicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoServicio) where?: Where<EstadoServicio>,
  ): Promise<Count> {
    return this.estadoServicioRepository.count(where);
  }

  @get('/estado-servicio')
  @response(200, {
    description: 'Array of EstadoServicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoServicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoServicio) filter?: Filter<EstadoServicio>,
  ): Promise<EstadoServicio[]> {
    return this.estadoServicioRepository.find(filter);
  }

  @patch('/estado-servicio')
  @response(200, {
    description: 'EstadoServicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoServicio, {partial: true}),
        },
      },
    })
    estadoServicio: EstadoServicio,
    @param.where(EstadoServicio) where?: Where<EstadoServicio>,
  ): Promise<Count> {
    return this.estadoServicioRepository.updateAll(estadoServicio, where);
  }

  @get('/estado-servicio/{id}')
  @response(200, {
    description: 'EstadoServicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoServicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EstadoServicio, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoServicio>
  ): Promise<EstadoServicio> {
    return this.estadoServicioRepository.findById(id, filter);
  }

  @patch('/estado-servicio/{id}')
  @response(204, {
    description: 'EstadoServicio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoServicio, {partial: true}),
        },
      },
    })
    estadoServicio: EstadoServicio,
  ): Promise<void> {
    await this.estadoServicioRepository.updateById(id, estadoServicio);
  }

  @put('/estado-servicio/{id}')
  @response(204, {
    description: 'EstadoServicio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() estadoServicio: EstadoServicio,
  ): Promise<void> {
    await this.estadoServicioRepository.replaceById(id, estadoServicio);
  }

  @del('/estado-servicio/{id}')
  @response(204, {
    description: 'EstadoServicio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.estadoServicioRepository.deleteById(id);
  }
}
