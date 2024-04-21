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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {SolicitudServicioFunerario} from '../models';
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

    // Enviar el código único al servidor de chat

    //Enviar codigoUnico por notificacion sms o email
    let cliente = await this.clienteRepository.findById(solicitudServicio.clienteId);

    //Verificar que el fallecido no sea el Cliente principal
    let beneficiario = await this.beneficiarioRepository.findById(solicitudServicio.beneficiarioId);

    if (!beneficiario) {

      if (cliente.correo == solicitudServicio.correoDifunto) {
        // Crear un nuevo beneficiario con los datos del cliente
        beneficiario = await this.beneficiarioRepository.create({
          primerNombre: cliente.primerNombre,
          segundoNombre: cliente.segundoNombre,
          primerApellido: cliente.primerApellido,
          segundoApellido: cliente.segundoApellido,
          correo: cliente.correo,
          celular: cliente.celular,
          foto: cliente.foto,
          ciudadResidencia: cliente.ciudadResidencia,
          direccion: cliente.direccion,
          fechaRegistro: cliente.fechaRegistro,
          activo: false,
        });

        // Crear un nuevo cliente utilizando los datos del beneficiario

        // Inicializar una variable para almacenar el beneficiario activo
        let beneficiarioActivo = null;

        // Iterar sobre los beneficiarios del cliente
        for (const beneficiario of cliente.beneficiarios) {
          // Verificar si el beneficiario está activo
          if (beneficiario.activo) {
            // Asignar el beneficiario activo y salir del bucle
            beneficiarioActivo = beneficiario;
            const nuevoCliente = await this.clienteRepository.create({
              primerNombre: beneficiario.primerNombre,
              segundoNombre: beneficiario.segundoNombre,
              primerApellido: beneficiario.primerApellido,
              segundoApellido: beneficiario.segundoApellido,
              correo: beneficiario.correo,
              celular: beneficiario.celular,
              foto: beneficiario.foto,
              ciudadResidencia: beneficiario.ciudadResidencia,
              direccion: beneficiario.direccion,
              fechaRegistro: new Date().toISOString(), // Opcional: puedes establecer la fecha actual como fecha de registro del cliente
            });

            let datos = {
              correoDestino: nuevoCliente.correo,
              nombreDestino: nuevoCliente.primerNombre + " " + nuevoCliente.segundoNombre,
              contenidoCorreo: solicitudServicio,  // **¡falta agregar que datos vamos a mostrar!**
              asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
            };

            let datos2 = {
              correoDestino: cliente.correo,
              nombreDestino: cliente.primerNombre + " " + cliente.segundoNombre,
              contenidoCorreo: codigoSalaChat,
              asuntoCorreo: ConfiguracionNotificaciones.CodigoSalaChat,
            };

            let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
            let url2 = ConfiguracionNotificaciones.urlNotificacionesemailCodigoSalaChat;
            console.log("sala" + cliente.correo + " nombre" + cliente.primerNombre + "Codigo" + codigoSalaChat + " " + llaveMaestra)
            //this.servicioNotificaciones.EnviarNotificacion(datos, url);
            //this.servicioNotificaciones.EnviarNotificacion(datos2, url2);
            break;
          }
        }
      }
      throw new HttpErrors.NotFound('El beneficiario no existe.');
    }

    if (beneficiario.correo == solicitudServicio.correoDifunto) {
      let datos = {
        correoDestino: cliente.correo,
        nombreDestino: cliente.primerNombre + " " + cliente.segundoNombre,
        contenidoCorreo: solicitudServicio,  // **¡falta agregar que datos vamos a mostrar!**
        asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
      };

      let datos2 = {
        correoDestino: cliente.correo,
        nombreDestino: cliente.primerNombre + " " + cliente.segundoNombre,
        contenidoCorreo: codigoSalaChat,
        asuntoCorreo: ConfiguracionNotificaciones.CodigoSalaChat,
      };

      let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
      let url2 = ConfiguracionNotificaciones.urlNotificacionesemailCodigoSalaChat;
      console.log("sala" + cliente.correo + " nombre" + cliente.primerNombre + "Codigo" + codigoSalaChat + " " + llaveMaestra)
      //this.servicioNotificaciones.EnviarNotificacion(datos, url);
      //this.servicioNotificaciones.EnviarNotificacion(datos2, url2);
      await this.chatService.enviarCodigoUnico(codigoSalaChat, llaveMaestra);
    } else {
      throw new HttpErrors.NotFound('El beneficiario no existe.');
      //throw new HttpErrors[401]("El id no corresponde con ninguno de los Beneficirios del cliente.");
    }
    return newSolicitudServicio;
  }
}
