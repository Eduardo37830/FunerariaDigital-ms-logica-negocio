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
  Sede,
  Conductor,
} from '../models';
import {SedeRepository} from '../repositories';

export class SedeConductorController {
  constructor(
    @repository(SedeRepository) protected sedeRepository: SedeRepository,
  ) { }

  @get('/sedes/{id}/conductors', {
    responses: {
      '200': {
        description: 'Array of Sede has many Conductor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Conductor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Conductor>,
  ): Promise<Conductor[]> {
    return this.sedeRepository.conductors(id).find(filter);
  }

  @post('/sedes/{id}/conductors', {
    responses: {
      '200': {
        description: 'Sede model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sede.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductorInSede',
            exclude: ['id'],
            optional: ['sedeId']
          }),
        },
      },
    }) conductor: Omit<Conductor, 'id'>,
  ): Promise<Conductor> {
    return this.sedeRepository.conductors(id).create(conductor);
  }

  @patch('/sedes/{id}/conductors', {
    responses: {
      '200': {
        description: 'Sede.Conductor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {partial: true}),
        },
      },
    })
    conductor: Partial<Conductor>,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.sedeRepository.conductors(id).patch(conductor, where);
  }

  @del('/sedes/{id}/conductors', {
    responses: {
      '200': {
        description: 'Sede.Conductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.sedeRepository.conductors(id).delete(where);
  }
}
