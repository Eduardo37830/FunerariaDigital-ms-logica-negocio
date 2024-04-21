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
import {ServicioFunerario, SolicitudServicioFunerario} from '../models';
import {ClienteRepository, SalaRepository, ServicioFunerarioRepository} from '../repositories';
import {NotificacionesService} from '../services';
import {SeguridadService} from '../services/seguridad.service';

export class ServicioFunerarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SeguridadService)
    public servicioSeguridad: SeguridadService,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
    @repository(SolicitudServicioFunerario)
    public solicitudServicioFunerario: SolicitudServicioFunerario,
  ) { }

  @post('/servicio-funerario')
  @response(200, {
    description: 'ServicioFunerario model instance',
    content: {'application/json': {schema: getModelSchemaRef(ServicioFunerario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {
            title: 'NewServicioFunerario',
            exclude: ['id'],
          }),
        },
      },
    })
    servicioFunerario: Omit<ServicioFunerario, 'id'>,
  ): Promise<ServicioFunerario> {
    // Generar un código único para la sala de chat
    const codigoUnicoServicio = this.servicioSeguridad.crearTextoAleatorio(6)
    //Enviar codigoUnico por notificacion sms o email
    // Enviar correo tanto al Conductor como al cliente con los datos del servicio generado

    const cliente = await this.clienteRepository.findById(this.solicitudServicioFunerario.clienteId);

    if (this.solicitudServicioFunerario.clienteId == cliente.id) {
      console.log("Cliente " + cliente.correo)

    }

    /*let datos = {
      correoDestino: cliente.correo,
      nombreDestino: servicioFunerario.conductorId,
      contenidoCorreo: servicioFunerario.fecha + " " + servicioFunerario.salaId + " " + codigoUnicoServicio,  // **¡falta agregar que datos vamos a mostrar: Ciudad, Sede**
      asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
    };

    let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
    this.servicioNotificaciones.EnviarNotificacion(datos, url);*/
    return this.servicioFunerarioRepository.create(servicioFunerario);
  }

  @get('/servicio-funerario/count')
  @response(200, {
    description: 'ServicioFunerario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ServicioFunerario) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.count(where);
  }

  @get('/servicio-funerario')
  @response(200, {
    description: 'Array of ServicioFunerario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ServicioFunerario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ServicioFunerario) filter?: Filter<ServicioFunerario>,
  ): Promise<ServicioFunerario[]> {
    return this.servicioFunerarioRepository.find(filter);
  }

  @patch('/servicio-funerario')
  @response(200, {
    description: 'ServicioFunerario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {partial: true}),
        },
      },
    })
    servicioFunerario: ServicioFunerario,
    @param.where(ServicioFunerario) where?: Where<ServicioFunerario>,
  ): Promise<Count> {
    return this.servicioFunerarioRepository.updateAll(servicioFunerario, where);
  }

  @get('/servicio-funerario/{id}')
  @response(200, {
    description: 'ServicioFunerario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ServicioFunerario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServicioFunerario, {exclude: 'where'}) filter?: FilterExcludingWhere<ServicioFunerario>
  ): Promise<ServicioFunerario> {
    return this.servicioFunerarioRepository.findById(id, filter);
  }

  @patch('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServicioFunerario, {partial: true}),
        },
      },
    })
    servicioFunerario: ServicioFunerario,
  ): Promise<void> {
    await this.servicioFunerarioRepository.updateById(id, servicioFunerario);
  }

  @put('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() servicioFunerario: ServicioFunerario,
  ): Promise<void> {
    await this.servicioFunerarioRepository.replaceById(id, servicioFunerario);
  }

  @del('/servicio-funerario/{id}')
  @response(204, {
    description: 'ServicioFunerario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.servicioFunerarioRepository.deleteById(id);
  }
}
