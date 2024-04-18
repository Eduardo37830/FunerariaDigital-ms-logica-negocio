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
import {Servicio} from '../models';
import {ServicioRepository} from '../repositories';

export class ServicioController {
  constructor(
    @repository(ServicioRepository)
    public servicioRepository : ServicioRepository,
  ) {}

  @post('/servicio')
  @response(200, {
    description: 'Servicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Servicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {
            title: 'NewServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    servicio: Omit<Servicio, 'id'>,
  ): Promise<Servicio> {
    return this.servicioRepository.create(servicio);
  }

  @get('/servicio/count')
  @response(200, {
    description: 'Servicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Servicio) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.servicioRepository.count(where);
  }

  @get('/servicio')
  @response(200, {
    description: 'Array of Servicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Servicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Servicio) filter?: Filter<Servicio>,
  ): Promise<Servicio[]> {
    return this.servicioRepository.find(filter);
  }

  @patch('/servicio')
  @response(200, {
    description: 'Servicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Servicio,
    @param.where(Servicio) where?: Where<Servicio>,
  ): Promise<Count> {
    return this.servicioRepository.updateAll(servicio, where);
  }

  @get('/servicio/{id}')
  @response(200, {
    description: 'Servicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Servicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Servicio, {exclude: 'where'}) filter?: FilterExcludingWhere<Servicio>
  ): Promise<Servicio> {
    return this.servicioRepository.findById(id, filter);
  }

  @patch('/servicio/{id}')
  @response(204, {
    description: 'Servicio PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Servicio, {partial: true}),
        },
      },
    })
    servicio: Servicio,
  ): Promise<void> {
    await this.servicioRepository.updateById(id, servicio);
  }

  @put('/servicio/{id}')
  @response(204, {
    description: 'Servicio PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servicio: Servicio,
  ): Promise<void> {
    await this.servicioRepository.replaceById(id, servicio);
  }

  @del('/servicio/{id}')
  @response(204, {
    description: 'Servicio DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servicioRepository.deleteById(id);
  }
}
