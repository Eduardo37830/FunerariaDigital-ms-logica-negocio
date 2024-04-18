import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {SolicitudServicioFunerario} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository : SolicitudServicioFunerarioRepository,
  ) {}

  @post('/solicitud-servicio-funerario')
  @response(200, {
    description: 'SolicitudServicioFunerario model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudServicioFunerario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicioFunerario',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudServicioFunerario: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    return this.solicitudServicioFunerarioRepository.create(solicitudServicioFunerario);
  }

  @get('/solicitud-servicio-funerario/count')
  @response(200, {
    description: 'SolicitudServicioFunerario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudServicioFunerario) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.count(where);
  }

  @get('/solicitud-servicio-funerario')
  @response(200, {
    description: 'Array of SolicitudServicioFunerario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudServicioFunerario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudServicioFunerario) filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<SolicitudServicioFunerario[]> {
    return this.solicitudServicioFunerarioRepository.find(filter);
  }

  @patch('/solicitud-servicio-funerario')
  @response(200, {
    description: 'SolicitudServicioFunerario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {partial: true}),
        },
      },
    })
    solicitudServicioFunerario: SolicitudServicioFunerario,
    @param.where(SolicitudServicioFunerario) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.updateAll(solicitudServicioFunerario, where);
  }

  @get('/solicitud-servicio-funerario/{id}')
  @response(200, {
    description: 'SolicitudServicioFunerario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudServicioFunerario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudServicioFunerario, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudServicioFunerario>
  ): Promise<SolicitudServicioFunerario> {
    return this.solicitudServicioFunerarioRepository.findById(id, filter);
  }

  @patch('/solicitud-servicio-funerario/{id}')
  @response(204, {
    description: 'SolicitudServicioFunerario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {partial: true}),
        },
      },
    })
    solicitudServicioFunerario: SolicitudServicioFunerario,
  ): Promise<void> {
    await this.solicitudServicioFunerarioRepository.updateById(id, solicitudServicioFunerario);
  }

  @put('/solicitud-servicio-funerario/{id}')
  @response(204, {
    description: 'SolicitudServicioFunerario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudServicioFunerario: SolicitudServicioFunerario,
  ): Promise<void> {
    await this.solicitudServicioFunerarioRepository.replaceById(id, solicitudServicioFunerario);
  }

  @del('/solicitud-servicio-funerario/{id}')
  @response(204, {
    description: 'SolicitudServicioFunerario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudServicioFunerarioRepository.deleteById(id);
  }
}
