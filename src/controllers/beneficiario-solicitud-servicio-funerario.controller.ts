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
  Beneficiario,
  SolicitudServicioFunerario,
} from '../models';
import {BeneficiarioRepository} from '../repositories';

export class BeneficiarioSolicitudServicioFunerarioController {
  constructor(
    @repository(BeneficiarioRepository) protected beneficiarioRepository: BeneficiarioRepository,
  ) { }

  @get('/beneficiarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Beneficiario has many SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudServicioFunerario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<SolicitudServicioFunerario[]> {
    return this.beneficiarioRepository.solicitudServicioFunerarios(id).find(filter);
  }

  @post('/beneficiarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Beneficiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Beneficiario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicioFunerarioInBeneficiario',
            exclude: ['id'],
            optional: ['beneficiarioId']
          }),
        },
      },
    }) solicitudServicioFunerario: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    return this.beneficiarioRepository.solicitudServicioFunerarios(id).create(solicitudServicioFunerario);
  }

  @patch('/beneficiarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Beneficiario.SolicitudServicioFunerario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {partial: true}),
        },
      },
    })
    solicitudServicioFunerario: Partial<SolicitudServicioFunerario>,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.solicitudServicioFunerarios(id).patch(solicitudServicioFunerario, where);
  }

  @del('/beneficiarios/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Beneficiario.SolicitudServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.beneficiarioRepository.solicitudServicioFunerarios(id).delete(where);
  }
}
