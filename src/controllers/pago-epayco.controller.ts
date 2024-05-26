import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {PagoEpayco} from '../models';
import {PagoEpaycoRepository} from '../repositories/pago-epayco.repository';
import {EpaycoService} from '../services';


export class PagoEpaycoController {
  constructor(
    @repository(PagoEpaycoRepository)
    public pagoEpaycoRepository: PagoEpaycoRepository,
    @service(EpaycoService)
    public epaycoService: EpaycoService,
  ) { }

  @post('/pago-epaycos')
  @response(200, {
    description: 'PagoEpayco model instance',
    content: {'application/json': {schema: getModelSchemaRef(PagoEpayco)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoEpayco, {
            title: 'NewPagoEpayco',
            exclude: ['id'],
          }),
        },
      },
    })
    datosPago: Omit<PagoEpayco, 'id'>,
  ): Promise<PagoEpayco> {
    console.log('Datos recibidos:', datosPago);
    const pago = await this.pagoEpaycoRepository.create(datosPago);
    console.log('Pago creado:', pago);  // Log para verificar el estado del pago creado
    let properties: {
      // Define aquí los parámetros que esperas recibir en el body
      amount: {type: 'number'}
      currency: {type: 'string'}
      description: {type: 'string'}
      // Agrega más propiedades según sea necesario
    } = {
      amount: {type: 'number'},
      currency: {type: 'string'},
      description: {type: 'string'},
    };
    const respuestaEpayco = await this.epaycoService.crearPagoPrueba(datosPago);
    console.log('Respuesta de Epayco:', respuestaEpayco);
    if (respuestaEpayco.success) {
      pago.estado = 'completado';
      console.log('Pago completado:', pago);  // Log para verificar el estado del pago completado
    } else {
      pago.estado = 'fallido';
    }

    await this.pagoEpaycoRepository.updateById(pago.id, pago);
    console.log('Pago creado:', pago);  // Log para verificar el estado del pago creado
    return pago;
  }

  @get('/pago-epaycos/count')
  @response(200, {
    description: 'PagoEpayco model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PagoEpayco) where?: Where<PagoEpayco>,
  ): Promise<Count> {
    return this.pagoEpaycoRepository.count(where);
  }

  @get('/pago-epaycos')
  @response(200, {
    description: 'Array of PagoEpayco model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PagoEpayco, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PagoEpayco) filter?: Filter<PagoEpayco>,
  ): Promise<PagoEpayco[]> {
    return this.pagoEpaycoRepository.find(filter);
  }

  @patch('/pago-epaycos')
  @response(200, {
    description: 'PagoEpayco PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoEpayco, {partial: true}),
        },
      },
    })
    pagoEpayco: PagoEpayco,
    @param.where(PagoEpayco) where?: Where<PagoEpayco>,
  ): Promise<Count> {
    return this.pagoEpaycoRepository.updateAll(pagoEpayco, where);
  }

  @get('/pago-epaycos/{id}')
  @response(200, {
    description: 'PagoEpayco model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PagoEpayco, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PagoEpayco, {exclude: 'where'}) filter?: FilterExcludingWhere<PagoEpayco>
  ): Promise<PagoEpayco> {
    return this.pagoEpaycoRepository.findById(id, filter);
  }

  @patch('/pago-epaycos/{id}')
  @response(204, {
    description: 'PagoEpayco PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PagoEpayco, {partial: true}),
        },
      },
    })
    pagoEpayco: PagoEpayco,
  ): Promise<void> {
    await this.pagoEpaycoRepository.updateById(id, pagoEpayco);
  }

  @put('/pago-epaycos/{id}')
  @response(204, {
    description: 'PagoEpayco PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() pagoEpayco: PagoEpayco,
  ): Promise<void> {
    await this.pagoEpaycoRepository.replaceById(id, pagoEpayco);
  }

  @del('/pago-epaycos/{id}')
  @response(204, {
    description: 'PagoEpayco DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.pagoEpaycoRepository.deleteById(id);
  }
}
