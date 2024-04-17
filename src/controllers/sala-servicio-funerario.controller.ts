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
  Sala,
  ServicioFunerario,
} from '../models';
import {SalaRepository} from '../repositories';

export class SalaServicioFunerarioController {
  constructor(
    @repository(SalaRepository) protected salaRepository: SalaRepository,
  ) { }

  @get('/salas/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Sala has many ServicioFunerario',
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
    return this.salaRepository.servicioFunerarios(id).find(filter);
  }

  @post('/salas/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Sala model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sala.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerarioInSala',
            exclude: ['id'],
            optional: ['salaId']
          }),
        },
      },
    }) servicioFunerario: Omit<ServicioFunerario, 'id'>,
  ): Promise<ServicioFunerario> {
    return this.salaRepository.servicioFunerarios(id).create(servicioFunerario);
  }

  @patch('/salas/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Sala.ServicioFunerario PATCH success count',
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
    return this.salaRepository.servicioFunerarios(id).patch(servicioFunerario, where);
  }

  @del('/salas/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Sala.ServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.salaRepository.servicioFunerarios(id).delete(where);
  }
}
