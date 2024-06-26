import {inject, service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  HttpErrors,
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Cliente, SolicitudServicioFunerario} from '../models';
import {AdministradorRepository, ClienteRepository} from '../repositories';
import {NotificacionesService} from '../services';
import {SeguridadService} from '../services/seguridad.service';
import {ClienteSolicitudServicioFunerarioController} from './cliente-solicitud-servicio-funerario.controller';

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @service(SeguridadService)
    public seguridadService: SeguridadService,
    @inject('controllers.ClienteSolicitudServicioFunerarioController')
    public clienteSolicitudServicioController: ClienteSolicitudServicioFunerarioController, // Inyecta el controlador de cliente-solicitud-servicio-funerario
  ) { }

/*   @post('/cliente')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.clienteRepository.create(cliente);
  } */

  @post('/cliente-publico')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id', 'fechaRegistro'], // Excluye 'id' y 'fechaRegistro'
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id' | 'fechaRegistro'>, // Excluye 'id' y 'fechaRegistro'
  ): Promise<Cliente> {
    cliente.activo = true; // Asegúrate de que el campo 'activo' también esté establecido

    try {
      return await this.clienteRepository.create(cliente);
    } catch (error) {
      throw new HttpErrors.InternalServerError('Error al crear el cliente');
    }
  }

  @get('/cliente/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/cliente')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/cliente')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/cliente/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @get('/listarSolicitudes/{id}')
  async listarSolicitudesServicioFunerario(
    @param.path.number('id') clienteId: typeof Cliente.prototype.id,
  ): Promise<SolicitudServicioFunerario[]> {
    return this.clienteSolicitudServicioController.find(clienteId!); // Llama al método find del controlador de cliente-solicitud-servicio-funerario
  }

  @get('/cliente-paginado')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async findToPagination(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<object> {
    const total: number = (await this.clienteRepository.count()).count;
    const registros: Cliente[] = await this.clienteRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total
    }
    return respuesta;
  }

  @get('/cliente-por-fecha')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            'x-ts-type': Cliente,
          },
        },
      },
    },
  })
  async findByFechaRegistro(
    @param.query.string('fechaRegistro') fechaRegistro: Date,
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<any> {
    let fechaInicio = new Date(fechaRegistro);
    fechaInicio.setHours(0, 0, 0, 0);
    let fechaFin = new Date(fechaRegistro);
    fechaFin.setHours(23, 59, 59, 999);
    return this.clienteRepository.find({
      where: {
        activo: fechaRegistro >= fechaInicio && fechaRegistro <= fechaFin,
      },
    });
  }

  @patch('/cliente/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/cliente/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/cliente/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }

  /* Obtener cliente por _idseguridad */
  @get('/cliente-por-idseguridad/{idseguridad}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findByIdSeguridad(
    @param.path.string('idseguridad') idseguridad: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente | null> {
    return this.clienteRepository.findOne({where: {_idSeguridad: idseguridad}}, filter);
  }
}
