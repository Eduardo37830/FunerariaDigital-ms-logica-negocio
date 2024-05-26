import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {GenerarPqrs} from '../models';
import {GenerarPqrsRepository} from '../repositories/generar-pqrs.repository';
import {NotificacionesService} from '../services/notificaciones.service';

export class GenerarPqrsController {
  constructor(
    @repository(GenerarPqrsRepository)
    public generarPqrsRepository: GenerarPqrsRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @post('/generar-pqrs')
  @response(200, {
    description: 'GenerarPqrs model instance',
    content: {'application/json': {schema: getModelSchemaRef(GenerarPqrs)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenerarPqrs, {
            title: 'NewGenerarPqrs',
            exclude: ['id'], //TENER EN CUENTA
          }),
        },
      },
    })
    generarPqrs: Omit<GenerarPqrs, 'id'>,
  ): Promise<GenerarPqrs> {
    /* Enviar notificacion al administrador */
    let datos = {
      correoDestino: generarPqrs.correo,
      nombreDestino: generarPqrs.nombre,
      contenidoCorreo: generarPqrs.pqrs,
      asuntoCorreo: generarPqrs.tipo,
    };
    let url = ConfiguracionNotificaciones.urlNotificacionesPQRS;
    this.servicioNotificaciones.EnviarNotificacion(datos, url)
    return this.generarPqrsRepository.create(generarPqrs);
  }

  @get('/generar-pqrs/count')
  @response(200, {
    description: 'GenerarPqrs model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(GenerarPqrs) where?: Where<GenerarPqrs>,
  ): Promise<Count> {
    return this.generarPqrsRepository.count(where);
  }

  @get('/generar-pqrs')
  @response(200, {
    description: 'Array of GenerarPqrs model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(GenerarPqrs, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(GenerarPqrs) filter?: Filter<GenerarPqrs>,
  ): Promise<GenerarPqrs[]> {
    return this.generarPqrsRepository.find(filter);
  }

  @patch('/generar-pqrs')
  @response(200, {
    description: 'GenerarPqrs PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenerarPqrs, {partial: true}),
        },
      },
    })
    generarPqrs: GenerarPqrs,
    @param.where(GenerarPqrs) where?: Where<GenerarPqrs>,
  ): Promise<Count> {
    return this.generarPqrsRepository.updateAll(generarPqrs, where);
  }

  @get('/generar-pqrs/{id}')
  @response(200, {
    description: 'GenerarPqrs model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(GenerarPqrs, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GenerarPqrs, {exclude: 'where'}) filter?: FilterExcludingWhere<GenerarPqrs>
  ): Promise<GenerarPqrs> {
    return this.generarPqrsRepository.findById(id, filter);
  }

  @patch('/generar-pqrs/{id}')
  @response(204, {
    description: 'GenerarPqrs PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GenerarPqrs, {partial: true}),
        },
      },
    })
    generarPqrs: GenerarPqrs,
  ): Promise<void> {
    await this.generarPqrsRepository.updateById(id, generarPqrs);
  }

  @put('/generar-pqrs/{id}')
  @response(204, {
    description: 'GenerarPqrs PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() generarPqrs: GenerarPqrs,
  ): Promise<void> {
    await this.generarPqrsRepository.replaceById(id, generarPqrs);
  }

  @del('/generar-pqrs/{id}')
  @response(204, {
    description: 'GenerarPqrs DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.generarPqrsRepository.deleteById(id);
  }
}
