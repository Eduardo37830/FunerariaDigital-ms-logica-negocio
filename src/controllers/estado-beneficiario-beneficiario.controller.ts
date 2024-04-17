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
  EstadoBeneficiario,
  Beneficiario,
} from '../models';
import {EstadoBeneficiarioRepository} from '../repositories';

export class EstadoBeneficiarioBeneficiarioController {
  constructor(
    @repository(EstadoBeneficiarioRepository) protected estadoBeneficiarioRepository: EstadoBeneficiarioRepository,
  ) { }

  @get('/estado-beneficiarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'Array of EstadoBeneficiario has many Beneficiario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Beneficiario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Beneficiario>,
  ): Promise<Beneficiario[]> {
    return this.estadoBeneficiarioRepository.beneficiarios(id).find(filter);
  }

  @post('/estado-beneficiarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'EstadoBeneficiario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Beneficiario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof EstadoBeneficiario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {
            title: 'NewBeneficiarioInEstadoBeneficiario',
            exclude: ['id'],
            optional: ['estadoBeneficiarioId']
          }),
        },
      },
    }) beneficiario: Omit<Beneficiario, 'id'>,
  ): Promise<Beneficiario> {
    return this.estadoBeneficiarioRepository.beneficiarios(id).create(beneficiario);
  }

  @patch('/estado-beneficiarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'EstadoBeneficiario.Beneficiario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Beneficiario, {partial: true}),
        },
      },
    })
    beneficiario: Partial<Beneficiario>,
    @param.query.object('where', getWhereSchemaFor(Beneficiario)) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.estadoBeneficiarioRepository.beneficiarios(id).patch(beneficiario, where);
  }

  @del('/estado-beneficiarios/{id}/beneficiarios', {
    responses: {
      '200': {
        description: 'EstadoBeneficiario.Beneficiario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Beneficiario)) where?: Where<Beneficiario>,
  ): Promise<Count> {
    return this.estadoBeneficiarioRepository.beneficiarios(id).delete(where);
  }
}
