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
  response
} from '@loopback/rest';
import {SalaChat} from '../models';
import {SalaChatRepository} from '../repositories';
import {SeguridadService} from '../services/seguridad.service';

export class SalaChatController {
  constructor(
    @repository(SalaChatRepository)
    public salaChatRepository: SalaChatRepository,
    @repository(SeguridadService)
    public seguridad: SeguridadService,

  ) { }

  @post('/sala-chat')
  @response(200, {
    description: 'SalaChat model instance',
    content: {'application/json': {schema: getModelSchemaRef(SalaChat)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaChat, {
            title: 'NewSalaChat',
            exclude: ['id'],
          }),
        },
      },
    })
    salaChat: Omit<SalaChat, 'id'>,
  ): Promise<SalaChat> {
    return this.salaChatRepository.create(salaChat);
  }

  @get('/sala-chat/count')
  @response(200, {
    description: 'SalaChat model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SalaChat) where?: Where<SalaChat>,
  ): Promise<Count> {
    return this.salaChatRepository.count(where);
  }

  @get('/sala-chat')
  @response(200, {
    description: 'Array of SalaChat model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SalaChat, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SalaChat) filter?: Filter<SalaChat>,
  ): Promise<SalaChat[]> {
    return this.salaChatRepository.find(filter);
  }

  @patch('/sala-chat')
  @response(200, {
    description: 'SalaChat PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaChat, {partial: true}),
        },
      },
    })
    salaChat: SalaChat,
    @param.where(SalaChat) where?: Where<SalaChat>,
  ): Promise<Count> {
    return this.salaChatRepository.updateAll(salaChat, where);
  }

  @get('/sala-chat/{id}')
  @response(200, {
    description: 'SalaChat model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SalaChat, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SalaChat, {exclude: 'where'}) filter?: FilterExcludingWhere<SalaChat>
  ): Promise<SalaChat> {
    return this.salaChatRepository.findById(id, filter);
  }

  @patch('/sala-chat/{id}')
  @response(204, {
    description: 'SalaChat PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SalaChat, {partial: true}),
        },
      },
    })
    salaChat: SalaChat,
  ): Promise<void> {
    await this.salaChatRepository.updateById(id, salaChat);
  }

  @put('/sala-chat/{id}')
  @response(204, {
    description: 'SalaChat PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() salaChat: SalaChat,
  ): Promise<void> {
    await this.salaChatRepository.replaceById(id, salaChat);
  }

  @del('/sala-chat/{id}')
  @response(204, {
    description: 'SalaChat DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salaChatRepository.deleteById(id);
  }
}

