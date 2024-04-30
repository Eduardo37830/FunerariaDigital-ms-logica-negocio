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
  Conductor,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioConductorController {
  constructor(
    @repository(ServicioFunerarioRepository) protected servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/conductors', {
    responses: {
      '200': {
        description: 'Array of ServicioFunerario has many Conductor',
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
    return this.servicioFunerarioRepository.conductors(id).find(filter);
  }

  @post('/servicio-funerarios/{id}/conductors', {
    responses: {
      '200': {
        description: 'ServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Conductor)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Conductor, {
            title: 'NewConductorInServicioFunerario',
            exclude: ['id'],
            optional: ['servicioFunerarioId']
          }),
        },
      },
    }) conductor: Omit<Conductor, 'id'>,
  ): Promise<Conductor> {
    return this.servicioFunerarioRepository.conductors(id).create(conductor);
  }

  @patch('/servicio-funerarios/{id}/conductors', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Conductor PATCH success count',
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
    return this.servicioFunerarioRepository.conductors(id).patch(conductor, where);
  }

  @del('/servicio-funerarios/{id}/conductors', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Conductor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Conductor)) where?: Where<Conductor>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.conductors(id).delete(where);
  }
}
