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
  Sala,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioSalaController {
  constructor(
    @repository(ServicioFunerarioRepository) protected servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/salas', {
    responses: {
      '200': {
        description: 'Array of ServicioFunerario has many Sala',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sala)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sala>,
  ): Promise<Sala[]> {
    return this.servicioFunerarioRepository.salas(id).find(filter);
  }

  @post('/servicio-funerarios/{id}/salas', {
    responses: {
      '200': {
        description: 'ServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sala)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {
            title: 'NewSalaInServicioFunerario',
            exclude: ['id'],
            optional: ['servicioFunerarioId']
          }),
        },
      },
    }) sala: Omit<Sala, 'id'>,
  ): Promise<Sala> {
    return this.servicioFunerarioRepository.salas(id).create(sala);
  }

  @patch('/servicio-funerarios/{id}/salas', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Sala PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {partial: true}),
        },
      },
    })
    sala: Partial<Sala>,
    @param.query.object('where', getWhereSchemaFor(Sala)) where?: Where<Sala>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.salas(id).patch(sala, where);
  }

  @del('/servicio-funerarios/{id}/salas', {
    responses: {
      '200': {
        description: 'ServicioFunerario.Sala DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sala)) where?: Where<Sala>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.salas(id).delete(where);
  }
}
