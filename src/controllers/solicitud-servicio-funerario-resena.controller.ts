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
  SolicitudServicioFunerario,
  Resena,
  Resena,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioResenaController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository) protected solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/resena', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario has one Resena',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Resena),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Resena>,
  ): Promise<Resena> {
    return this.solicitudServicioFunerarioRepository.resena(id).get(filter);
  }

  @post('/solicitud-servicio-funerarios/{id}/resena', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Resena)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {
            title: 'NewResenaInSolicitudServicioFunerario',
            exclude: ['id'],
            optional: ['solicitudServicioFunerarioId']
          }),
        },
      },
    }) resena: Omit<Resena, 'id'>,
  ): Promise<Resena> {
    return this.solicitudServicioFunerarioRepository.resena(id).create(resena);
  }

  @patch('/solicitud-servicio-funerarios/{id}/resena', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario.Resena PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Resena, {partial: true}),
        },
      },
    })
    resena: Partial<Resena>,
    @param.query.object('where', getWhereSchemaFor(Resena)) where?: Where<Resena>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.resena(id).patch(resena, where);
  }

  @del('/solicitud-servicio-funerarios/{id}/resena', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario.Resena DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Resena)) where?: Where<Resena>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.resena(id).delete(where);
  }
}
