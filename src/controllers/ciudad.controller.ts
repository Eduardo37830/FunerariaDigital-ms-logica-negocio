import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Ciudad} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository: CiudadRepository,
  ) { }

  @post('/ciudad')
  @response(200, {
    description: 'Ciudad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudad',
            exclude: ['id'],
          }),
        },
      },
    })
    ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.ciudadRepository.create(ciudad);
  }

  @get('/ciudad/count')
  @response(200, {
    description: 'Ciudad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.count(where);
  }

  @get('/ciudad')
  @response(200, {
    description: 'Array of Ciudad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ciudad) filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.ciudadRepository.find(filter);
  }

  @patch('/ciudad')
  @response(200, {
    description: 'Ciudad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.updateAll(ciudad, where);
  }

  @get('/ciudad/{id}')
  @response(200, {
    description: 'Ciudad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ciudad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Ciudad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudad>
  ): Promise<Ciudad> {
    return this.ciudadRepository.findById(id, filter);
  }

  @get('/ciudad-paginado')
  @response(200, {
    description: 'Array of Ciudad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudad, {includeRelations: true}),
        },
      },
    },
  })
  async findToPagination(
    @param.filter(Ciudad) filter?: Filter<Ciudad>,
  ): Promise<object> {
    const total: number = (await this.ciudadRepository.count()).count;
    const registros: Ciudad[] = await this.ciudadRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total
    }
    return respuesta;
  }

  @patch('/ciudad/{id}')
  @response(204, {
    description: 'Ciudad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.updateById(id, ciudad);
  }

  @put('/ciudad/{id}')
  @response(204, {
    description: 'Ciudad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.replaceById(id, ciudad);
  }

  @del('/ciudad/{id}')
  @response(204, {
    description: 'Ciudad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ciudadRepository.deleteById(id);
  }
}
