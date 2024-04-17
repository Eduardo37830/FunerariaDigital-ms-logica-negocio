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
  Administrador,
  Sede,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorSedeController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/sede', {
    responses: {
      '200': {
        description: 'Administrador has one Sede',
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
    return this.administradorRepository.sede(id).get(filter);
  }

  @post('/administradors/{id}/sede', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sede)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sede, {
            title: 'NewSedeInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) sede: Omit<Sede, 'id'>,
  ): Promise<Sede> {
    return this.administradorRepository.sede(id).create(sede);
  }

  @patch('/administradors/{id}/sede', {
    responses: {
      '200': {
        description: 'Administrador.Sede PATCH success count',
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
    return this.administradorRepository.sede(id).patch(sede, where);
  }

  @del('/administradors/{id}/sede', {
    responses: {
      '200': {
        description: 'Administrador.Sede DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sede)) where?: Where<Sede>,
  ): Promise<Count> {
    return this.administradorRepository.sede(id).delete(where);
  }
}
