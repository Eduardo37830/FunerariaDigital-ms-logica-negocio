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
import {Sala, ServicioFunerario, SolicitudServicioFunerario} from '../models';
import {ClienteRepository, ConductorRepository, SalaRepository, ServicioFunerarioRepository} from '../repositories';
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
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  /**
   * Obtiene las salas disponibles según la hora de asignación y salida del servicio funerario.
   * Se asignan las salas al tercer día de la solicitud y la duración del servicio es de 3 horas.
   * @returns Un arreglo de salas disponibles.
   */
  async obtenerSalasDisponibles(): Promise<Sala[]> {
    let ahora = new Date(); // Obtener la fecha y hora actual

    // Calcular la fecha y hora de inicio del servicio (3 días después de la solicitud)
    let fechaHoraInicioServicio = ahora.getTime() + 3 * 24 * 60 * 60 * 1000;  // 3 dias en milisegundos

    // Calcular la fecha y hora de fin del servicio (3 horas después del inicio)
    let fechaHoraFinServicio = fechaHoraInicioServicio + 3 * 60 * 60 * 1000; // 3 horas en milisegundos

    // Crear objetos de fecha y hora para la asignación y salida del servicio
    let fechaHoraAsignacionServicio = new Date(fechaHoraInicioServicio);
    let fechaHoraSalidaServicio = new Date(fechaHoraFinServicio);

    // Consultar las salas disponibles según la hora de entrada y salida del cuerpo
    const salasDisponibles = await this.salaRepository.find({
      where: {
        and: [
          {horaEntradaCuerpo: {lte: fechaHoraAsignacionServicio}}, // Hora de entrada del cuerpo anterior o igual a la actual
          {horaSalidaCuerpo: {gte: fechaHoraSalidaServicio}}, // Hora de salida del cuerpo posterior o igual a la actual
          {disponible: true},
        ],
      },
    });
    return salasDisponibles;
  }

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

    const codigoUnicoServicio = this.servicioSeguridad.crearTextoAleatorio(6)

    console.log("Codigo unico: ", codigoUnicoServicio)

    //Enviar codigoUnico por notificacion sms o email - Enviar correo tanto al Conductor como al cliente con los datos del servicio generado

    const cliente = await this.clienteRepository.findById(this.solicitudServicioFunerario.clienteId);
    const conductor = await this.conductorRepository.findById(servicioFunerario.conductorId);

    console.log("Cliente: ", cliente.correo)
    console.log("Conductor: ", conductor.correo)
    if (this.solicitudServicioFunerario.estadoAceptado) {
      const salasDisponibles = await this.obtenerSalasDisponibles();

      console.log("Salas disponibles: ", salasDisponibles)

      for (let sala of salasDisponibles) {


        // Actualizar la sala asignada
        sala.disponible = false;
        await this.salaRepository.update(sala);

        // Asignar la sala al servicio funerario

      }
    }

    if (this.solicitudServicioFunerario.clienteId == cliente.id) {
      console.log("Cliente " + cliente.correo)

    }

    // Correo al Cliente
    let datos = {
      correoDestino: cliente.correo,
      nombreDestino: cliente.primerNombre + " " + cliente.primerApellido,
      contenidoCorreo: "Envio de datos del servicio funerario" + servicioFunerario.fecha + " " + "servicioFunerario.salaId" + " " + codigoUnicoServicio,  // **¡falta agregar que datos vamos a mostrar: Ciudad, Sede**
      asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
    };

    // Correo al Conductor
    let datos2 = {
      correoDestino: conductor.correo,
      nombreDestino: conductor.primerNombre + " " + conductor.primerApellido,
      contenidoCorreo: "Envio de datos del servicio funerario" + servicioFunerario.fecha + " " + "servicioFunerario.salaId" + " " + codigoUnicoServicio,  // **¡falta agregar que datos vamos a mostrar: Ciudad, Sede**
      asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
    };

    let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
    //this.servicioNotificaciones.EnviarNotificacion(datos, url);
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
