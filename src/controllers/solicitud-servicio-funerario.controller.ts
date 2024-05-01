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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {Cliente, SolicitudServicioFunerario} from '../models';
import {
  BeneficiarioRepository,
  ClienteRepository,
  SalaChatRepository,
  SolicitudServicioFunerarioRepository,
} from '../repositories';
import {NotificacionesService} from '../services';
import {ChatService} from '../services/chat.service';
import {SeguridadService} from '../services/seguridad.service';

export class SolicitudServicioFunerarioController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
    @service(SeguridadService)
    public servicioSeguridad: SeguridadService,
    @repository(SalaChatRepository)
    public salaChatRepository: SalaChatRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(BeneficiarioRepository)
    public beneficiarioRepository: BeneficiarioRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(ChatService)
    public chatService: ChatService,
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



  @post('/solicitud-servicio-funerario')
  @response(200, {
    description: 'SolicitudServicioFunerario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudServicioFunerario),
      },
    },
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
    @param.where(SolicitudServicioFunerario)
    where?: Where<SolicitudServicioFunerario>,
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
          items: getModelSchemaRef(SolicitudServicioFunerario, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudServicioFunerario)
    filter?: Filter<SolicitudServicioFunerario>,
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
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            partial: true,
          }),
        },
      },
    })
    solicitudServicioFunerario: SolicitudServicioFunerario,
    @param.where(SolicitudServicioFunerario)
    where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.solicitudServicioFunerarioRepository.updateAll(
      solicitudServicioFunerario,
      where,
    );
  }

  @get('/solicitud-servicio-funerario/{id}')
  @response(200, {
    description: 'SolicitudServicioFunerario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudServicioFunerario, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SolicitudServicioFunerario, {exclude: 'where'})
    filter?: FilterExcludingWhere<SolicitudServicioFunerario>,
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
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            partial: true,
          }),
        },
      },
    })
    solicitudServicioFunerario: SolicitudServicioFunerario,
  ): Promise<void> {
    await this.solicitudServicioFunerarioRepository.updateById(
      id,
      solicitudServicioFunerario,
    );
  }

  @put('/solicitud-servicio-funerario/{id}')
  @response(204, {
    description: 'SolicitudServicioFunerario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() solicitudServicioFunerario: SolicitudServicioFunerario,
  ): Promise<void> {
    await this.solicitudServicioFunerarioRepository.replaceById(
      id,
      solicitudServicioFunerario,
    );
  }

  @del('/solicitud-servicio-funerario/{id}')
  @response(204, {
    description: 'SolicitudServicioFunerario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.solicitudServicioFunerarioRepository.deleteById(id);
  }

  @post('/solicitud-servicios', {
    responses: {
      '200': {
        description: 'SolicitudServicio model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudServicioFunerario),
          },
        },
      },
    },
  })
  async SolicitudServicio(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicio',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudServicio: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    // Crear la solicitud de servicio
    const newSolicitudServicio =
      await this.solicitudServicioFunerarioRepository.create(solicitudServicio);

    // Generar un código único para la sala de chat
    const codigoSalaChat = this.servicioSeguridad.crearTextoAleatorio(6);
    const llaveMaestra = this.servicioSeguridad.crearTextoAleatorio(6);

    // Crear la sala de chat asociada
    const nuevaSalaChat = await this.solicitudServicioFunerarioRepository
      .salaChats(newSolicitudServicio.id)
      .create({
        nombre: `Sala de chat: ${codigoSalaChat}`, // Proporciona un nombre para la sala de chat
        descripcion: `conversatorio lastimoso`, // Proporciona una descripción para la sala de chat
        codigoUnico: codigoSalaChat,
        llaveMaestra: llaveMaestra,
      });

    //Enviar codigoUnico por notificacion sms o email
    let cliente = await this.clienteRepository.findById(solicitudServicio.clienteId);

    // Obtener el cliente con sus beneficiarios
    const clienteConBeneficiarios = await this.obtenerClienteConBeneficiarios(solicitudServicio.clienteId);

    if (cliente.activo == false) {
      throw new HttpErrors[401](`Cliente inactivo.`);
    }

    if (solicitudServicio.idBeneficiario != cliente.id) {

      if (clienteConBeneficiarios) {

        //console.log('Cliente:', clienteConBeneficiarios);
        //console.log('Beneficiarios:', clienteConBeneficiarios.beneficiarios);

        for (let beneficiario of clienteConBeneficiarios!.beneficiarios) {
          if (beneficiario.id === solicitudServicio.idBeneficiario && beneficiario.activo) {
            console.log("si existe un beneficirio y esta activo")

            // Enviar notificaciones y código único del servicio de se solicito
            const datos = {
              correoDestino: cliente.correo,
              nombreDestino: cliente.primerNombre + " " + cliente.segundoNombre,
              contenidoCorreo: "Datos solicitud: " + cliente.id + " " + cliente.ciudadResidencia + " " + cliente.foto + "datos del Difunto" + beneficiario.id + "Codigo sala " + codigoSalaChat,
              asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
              llaveMaestra: llaveMaestra,
            };

            beneficiario.activo = false;
            solicitudServicio.estadoAceptado == true;

            const url = ConfiguracionNotificaciones.urlNotificacionesemailCodigoSalaChat;
            //this.servicioNotificaciones.EnviarNotificacion(datos, url);
            //await this.chatService.enviarCodigoUnico(codigoSalaChat, llaveMaestra);
          } else {
            throw new HttpErrors[401](`Beneficiario no corresponde con la solicitud  o este se encuentra inactivo.`);
          }
        }
      } else {
        throw new HttpErrors[401](`Beneficiario no encontrado o este se encuentra inactivo.`);
      }
    } else {

      if (clienteConBeneficiarios) {
        // Si el cliente es el fallecido cambiar a Benefciciario y asignar un nuevo cliente
        for (let beneficiario of clienteConBeneficiarios!.beneficiarios) {
          console.log("Beneficiario actual:", beneficiario);

          if (beneficiario.activo) {

            await this.clienteRepository.updateById(cliente.id, {
              primerNombre: beneficiario.primerNombre,
              segundoNombre: beneficiario.segundoNombre,
              primerApellido: beneficiario.primerApellido,
              segundoApellido: beneficiario.segundoApellido,
              correo: beneficiario.correo,
              celular: beneficiario.celular,
              foto: beneficiario.foto,
              ciudadResidencia: beneficiario.ciudadResidencia,
              direccion: beneficiario.direccion,
              fechaRegistro: new Date(),
              activo: true,
            });

            console.log("Nuevo cliente creado:", beneficiario.correo);

            // Crear un nuevo beneficiario con los datos del cliente
            await this.beneficiarioRepository.updateById(beneficiario.id, {
              primerNombre: cliente!.primerNombre,
              segundoNombre: cliente!.segundoNombre,
              primerApellido: cliente!.primerApellido,
              segundoApellido: cliente!.segundoApellido,
              correo: cliente!.correo,
              celular: cliente!.celular,
              foto: cliente!.foto,
              ciudadResidencia: cliente!.ciudadResidencia,
              direccion: cliente!.direccion,
              fechaRegistro: cliente!.fechaRegistro,
              activo: false,
            });

            console.log("Nuevo Beneficiario creado:" + cliente.correo);

            // Enviar notificación
            const datos = {
              correoDestino: beneficiario.correo,
              nombreDestino: beneficiario.primerNombre + " " + beneficiario.segundoNombre,
              contenidoCorreo: "Datos solicitud: " + beneficiario.id + " " + beneficiario.ciudadResidencia + " " + beneficiario.foto + "datos del Difunto" + cliente.id + "Codigo sala " + codigoSalaChat,
              asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
              llaveMaestra: llaveMaestra,
            };

            beneficiario.activo = false;
            solicitudServicio.estadoAceptado == true;

            const url = ConfiguracionNotificaciones.urlNotificacionesemailCodigoSalaChat;
            //this.servicioNotificaciones.EnviarNotificacion(datos, url);
            //await this.chatService.enviarCodigoUnico(codigoSalaChat, llaveMaestra);
            break;
          } else {
            throw new HttpErrors.Unauthorized("El beneficiario no se encuentra activo.");
          }
        }
      }
    }
    return newSolicitudServicio;
  }
}
