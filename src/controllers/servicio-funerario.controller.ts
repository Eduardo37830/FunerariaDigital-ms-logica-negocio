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
import {Cliente, Conductor, CredencialesCodigoUnico, Sala, ServicioFunerario} from '../models';
import {BeneficiarioRepository, ClienteRepository, ConductorRepository, SalaRepository, SedeRepository, ServicioFunerarioRepository, SolicitudServicioFunerarioRepository} from '../repositories';
import {NotificacionesService} from '../services';
import {SeguridadService} from '../services/seguridad.service';
import {SalaController} from './sala.controller';
import {SedeSalaController} from './sede-sala.controller';

export class ServicioFunerarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(BeneficiarioRepository)
    public beneficiarioRepository: BeneficiarioRepository,
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
    @service(SeguridadService)
    public servicioSeguridad: SeguridadService,
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
    @inject('controllers.SalaController') // Inyecta una instancia del controlador de sala
    private salaController: SalaController,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @repository(SedeRepository)
    public sedeRepository: SedeRepository,
  ) { }

  /**
   *
   * @param idCliente
   * @returns
   */
  async obtenerClienteConBeneficiarios(idCliente: number): Promise<Cliente | null> {
    // Obtener el cliente por su ID
    const cliente = await this.clienteRepository.findById(idCliente);
    if (!cliente) {
      return null; // Retornar null si no se encuentra el cliente
    }

    // Cargar manualmente los beneficiarios del cliente
    const beneficiarios = await this.beneficiarioRepository.find({
      where: {clienteId: idCliente},
    });

    // Asignar los beneficiarios al cliente
    cliente.beneficiarios = beneficiarios;

    return cliente;
  }

  /**
   * Obtiene las salas disponibles según la hora de asignación y salida del servicio funerario.
   * Se asignan las salas al tercer día de la solicitud y la duración del servicio es de 3 horas.
   * @param sedeId - ID de la sede para filtrar las salas.
   * @returns Un arreglo de salas disponibles.
   */
  async obtenerSalasDisponibles(sedeId: number): Promise<Sala[]> {
    // Obtener la fecha y hora actual
    const ahora = new Date();

    // Calcular la fecha y hora de inicio del servicio (3 días después de la solicitud)
    const fechaHoraInicioServicio = ahora.getTime() + 3 * 24 * 60 * 60 * 1000; // 3 días en milisegundos

    // Calcular la fecha y hora de fin del servicio (3 horas después del inicio)
    const fechaHoraFinServicio = fechaHoraInicioServicio + 3 * 60 * 60 * 1000; // 3 horas en milisegundos

    // Crear objetos de fecha y hora para la asignación y salida del servicio
    const fechaHoraAsignacionServicio = new Date(fechaHoraInicioServicio);
    const fechaHoraSalidaServicio = new Date(fechaHoraFinServicio);

    // Crear una instancia del controlador SedeSalaController
    const sedeSalaController = new SedeSalaController(this.sedeRepository);

    // Obtener todas las salas de la sede asignada
    const todasLasSalas = await sedeSalaController.find(sedeId);

    // Filtrar las salas disponibles
    const salasDisponibles = await Promise.all(todasLasSalas.map(async (sala) => {
      const {disponible} = await this.salaController.verificarDisponibilidad({
        horaEntrada: fechaHoraAsignacionServicio,
        horaSalida: fechaHoraSalidaServicio,
        salaId: sala.id,
      });
      return {sala, disponible};
    }));

    return salasDisponibles.filter(({disponible}) => disponible).map(({sala}) => sala);
  }


  // Otener los conductores disponibles
  async obtenerConductoresDisponibles(): Promise<Conductor[]> {

    const conductoresDisponibles = await this.conductorRepository.find({
      where: {
        disponibilidad: true,
      },
    })

    return conductoresDisponibles;
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

    console.log("Creando servicio funerario: ", servicioFunerario);

    try {
      const codigoUnicoServicio = this.servicioSeguridad.crearTextoAleatorio(6);
      console.log("Codigo unico: ", codigoUnicoServicio);

      const solicitud = await this.solicitudServicioFunerarioRepository.findById(servicioFunerario.solicitudServicioFunerarioId);
      console.log("Solicitud: ", solicitud);

      const beneficiario = await this.beneficiarioRepository.findById(solicitud.idBeneficiario);
      console.log("Beneficiario: ", beneficiario);

      const cliente = await this.clienteRepository.findById(beneficiario.clienteId);
      console.log("Cliente: ", cliente);

      const salasDisponibles = await this.obtenerSalasDisponibles(1);
      console.log("Salas disponibles: ", salasDisponibles);

      const sala = await this.salaRepository.findById(servicioFunerario.salaId);
      console.log("Sala: ", sala);


      if (solicitud.estadoAceptado) {
        if (salasDisponibles.length === 0) {
          throw new Error("No hay salas disponibles para el servicio funerario");
        }


        const conductoresDisponibles = await this.obtenerConductoresDisponibles();
        console.log("Conductores disponibles: ", conductoresDisponibles);

        //Asignar un conductor disponible al servicio funerario
        if (conductoresDisponibles.length > 0) {
          const conductor = conductoresDisponibles[0]; // Tomar el primer conductor disponible

          let ahora = new Date(); // Obtener la fecha y hora actual
          let fechaHoraInicioServicio = ahora.getTime() + 3 * 24 * 60 * 60 * 1000; // 3 días en milisegundos
          let fechaHoraFinServicio = fechaHoraInicioServicio + 3 * 60 * 60 * 1000; // 3 horas en milisegundos

          // Crear objetos de fecha y hora para la asignación y salida del servicio
          const fechaHoraAsignacionServicio = new Date(fechaHoraInicioServicio);
          const fechaHoraSalidaServicio = new Date(fechaHoraFinServicio);

          // Actualizar la sala y el servicio funerario con los datos pertinentes
          await this.salaRepository.updateById(sala.id, {
            horaEntradaCuerpo: fechaHoraAsignacionServicio,
            horaSalidaCuerpo: fechaHoraSalidaServicio,
            disponible: false,
            //servicioFunerarioId: servicioFunerario.id
          });
          sala.horaEntradaCuerpo = fechaHoraAsignacionServicio;
          sala.horaSalidaCuerpo = fechaHoraSalidaServicio;
          servicioFunerario.codigoUnicoServicio = codigoUnicoServicio;
          servicioFunerario.tipo = sala.tipo;
          console.log("Sala actualizada: ", sala);

          await this.conductorRepository.updateById(conductor.id, {
            //servicioFunerarioId: servicioFunerario.id // Asignar el ID del servicio funerario al conductor
          });

          // Correo al Cliente
          const contenidoCorreoCliente = `Envio de datos del servicio funerario: ${servicioFunerario.fecha} Sala Asignada: ${sala.id} Horario: Hora fin del servicio: ${sala.horaEntradaCuerpo} Hora de culminacion del servicio: ${sala.horaSalidaCuerpo} Sede: ${sala.sedeId} Ciudad: ${beneficiario.ciudadResidencia}`;

          // Correo al Conductor
          const contenidoCorreoConductor = `Envio de datos del servicio funerario: ${servicioFunerario.fecha} Sala Asignada: ${sala.id} Horario: Hora fin del servicio: ${sala.horaEntradaCuerpo} Hora de culminacion del servicio: ${sala.horaSalidaCuerpo} Sede: ${sala.sedeId} Ciudad: ${beneficiario.ciudadResidencia} Codigo para verificar Datos: ${codigoUnicoServicio}`;

          const datosCorreoCliente = {
            correoDestino: cliente.correo,
            nombreDestino: `${cliente.primerNombre} ${cliente.primerApellido}`,
            contenidoCorreo: contenidoCorreoCliente,
            asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
          };

          const datosCorreoConductor = {
            correoDestino: conductor.correo,
            nombreDestino: `${conductor.primerNombre} ${conductor.primerApellido}`,
            contenidoCorreo: contenidoCorreoConductor,
            asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
          };
          console.log("Datos del correo al cliente: ", datosCorreoCliente);

          let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
          // Enviar correo al Cliente
          this.servicioNotificaciones.EnviarNotificacion(datosCorreoCliente, url);
          // Enviar correo al Conductor
          this.servicioNotificaciones.EnviarNotificacion(datosCorreoConductor, url);
        }

      }
      return this.servicioFunerarioRepository.create(servicioFunerario);
    } catch (error) {
      console.error("Error en la creación del servicio funerario:", error);
      throw error;
    }
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

  // Imprimir los datos del servicio funerario al ingresar el codigo unico
  @post('/validar-permisos')
  @response(200, {
    description: "Validación de permisos de usuario para lógica de negocio",
    content: {'application/json': {schema: getModelSchemaRef(CredencialesCodigoUnico)}}
  })
  async ValidarPermisosDeUsuario(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(CredencialesCodigoUnico)
          }
        }
      }
    )
    datos: CredencialesCodigoUnico
  ): Promise<object | undefined> {
    let servicioFunerario = this.servicioSeguridad.obtenerServicioFunerario(datos.codigoUnico);
    return servicioFunerario;
  }
}
