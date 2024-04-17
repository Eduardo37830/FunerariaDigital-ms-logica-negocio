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
  Ciudad,
  Sede,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadSedeController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/sede', {
    responses: {
      '200': {
        description: 'Ciudad has one Sede',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sede),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sede>,
  ): Promise<Sede> {
    return this.ciudadRepository.sede(id).get(filter);
  }

  @post('/ciudads/{id}/sede', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sede)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSedeInCiudad',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) sede: Omit<Sede, 'id'>,
  ): Promise<Sede> {
    return this.ciudadRepository.sede(id).create(sede);
  }

  @patch('/ciudads/{id}/sede', {
    responses: {
      '200': {
        description: 'Ciudad.Sede PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {partial: true}),
        },
      },
    })
    sede: Partial<Sede>,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.ciudadRepository.sede(id).patch(sede, where);
  }

  @del('/ciudads/{id}/sede', {
    responses: {
      '200': {
        description: 'Ciudad.Sede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.ciudadRepository.sede(id).delete(where);
  }
}
