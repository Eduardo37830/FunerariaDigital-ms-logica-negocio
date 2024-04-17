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
  Conductor,
  ServicioFunerario,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorServicioFunerarioController {
  constructor(
    @repository(ConductorRepository) protected conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Conductor has many ServicioFunerario',
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
    return this.conductorRepository.servicioFunerarios(id).find(filter);
  }

  @post('/conductors/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Conductor model instance',
        content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Conductor.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerarioInConductor',
            exclude: ['id'],
            optional: ['conductorId']
          }),
        },
      },
    }) servicioFunerario: Omit<ServicioFunerario, 'id'>,
  ): Promise<ServicioFunerario> {
    return this.conductorRepository.servicioFunerarios(id).create(servicioFunerario);
  }

  @patch('/conductors/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Conductor.ServicioFunerario PATCH success count',
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
    return this.conductorRepository.servicioFunerarios(id).patch(servicioFunerario, where);
  }

  @del('/conductors/{id}/servicio-funerarios', {
    responses: {
      '200': {
        description: 'Conductor.ServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ServicioFunerario)) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.conductorRepository.servicioFunerarios(id).delete(where);
  }
}
