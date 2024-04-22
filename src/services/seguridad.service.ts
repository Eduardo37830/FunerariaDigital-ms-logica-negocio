import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {ConfiguracionNotificaciones} from '../config/notificaciones.config';
import {Cliente, GenerarPqrs, SolicitudServicioFunerario} from '../models';
import {ClienteRepository, SalaChatRepository} from '../repositories';
const generator = require('generate-password');
const MD5 = require("crypto-js/md5");
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadService {
  clienteRepository: any;
  beneficiarioRepository: any;
  constructor(
    @repository(SalaChatRepository)
    public repositorioSalaChat: SalaChatRepository,
    @repository(ClienteRepository)
    public repositoryCliente: ClienteRepository,
  ) {

  }

  /**
   * Crear una clave aleatoria
   * @returns cadena aleatoria de n caracteres
   */
  crearTextoAleatorio(n: number): string {
    let clave = generator.generate({
      length: n,
      numbers: true
    });
    return clave;
  }

  /**
   * Se busca un Cliente por sus credenciales de acceso
   * @param credenciales credenciales del Cliente
   * @returns Cliente encontrado o null
   */
  async identificarCliente(credenciales: GenerarPqrs): Promise<Cliente | null> {
    let Cliente = await this.repositoryCliente.findOne({
      where: {
        correo: credenciales.correo,
        celular: credenciales.celular
      }
    });
    console.log(Cliente)
    return Cliente as Cliente;
  }

  async VerificarIdBeneficiario(credenciales: SolicitudServicioFunerario): Promise<Cliente | null> {
    //Verificar que el fallecido no sea el Cliente principal

    let cliente = await this.repositoryCliente.findOne({
      where: {
        id: credenciales.clienteId,
        activo: true,
      }
    });

    let beneficiario = await this.beneficiarioRepository.findOne({
      where: {
        id: credenciales.idBeneficiario,
        activo: true,
      }
    })


    if (cliente!.activo == true && credenciales.idBeneficiario != cliente!.id) {
      for (const beneficiario of cliente!.beneficiarios) {
        if (beneficiario.id == credenciales.idBeneficiario && beneficiario.activo == true) {
          let datos = {
            correoDestino: cliente!.correo,
            nombreDestino: cliente!.primerNombre + " " + cliente!.segundoNombre,
            contenidoCorreo: credenciales,  // **¡falta agregar que datos vamos a mostrar!**
            asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
          };

          let datos2 = {
            correoDestino: cliente!.correo,
            nombreDestino: cliente!.primerNombre + " " + cliente!.segundoNombre,
            contenidoCorreo: "",
            asuntoCorreo: ConfiguracionNotificaciones.CodigoSalaChat,
          };

          let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
          let url2 = ConfiguracionNotificaciones.urlNotificacionesemailCodigoSalaChat;
          console.log("sala" + cliente!.correo + " nombre" + cliente!.primerNombre + "Codigo" + "codigoSalaChat " + " " + " llaveMaestra")
          //this.servicioNotificaciones.EnviarNotificacion(datos, url);
          //this.servicioNotificaciones.EnviarNotificacion(datos2, url2);
          //await this.chatService.enviarCodigoUnico(codigoSalaChat, llaveMaestra);
        } else {
          throw new HttpErrors[401](`No se encontro el beneficiario o este no este se encuentra inactivo`);
        }
      }
    } else {

    }



    if (cliente!.id == credenciales.clienteId) {
      // Crear un nuevo beneficiario con los datos del cliente
      const nuevoCliente = await this.beneficiarioRepository.create({
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

      // Crear un nuevo cliente utilizando los datos del beneficiario

      // Inicializar una variable para almacenar el beneficiario activo
      let beneficiarioActivo = null;

      // Iterar sobre los beneficiarios del cliente
      for (const beneficiario of cliente!.beneficiarios) {
        // Verificar si el beneficiario está activo
        if (beneficiario.activo) {
          // Asignar el beneficiario activo y salir del bucle
          beneficiarioActivo = beneficiario;
          beneficiario.id = beneficiario.clienteId;

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
            activo: true,
          });

          let datos = {
            correoDestino: nuevoCliente.correo,
            nombreDestino: nuevoCliente.primerNombre + " " + nuevoCliente.segundoNombre,
            contenidoCorreo: credenciales,  // **¡falta agregar que datos vamos a mostrar!**
            asuntoCorreo: ConfiguracionNotificaciones.datosServicioSolicitado,
          };

          let datos2 = {
            correoDestino: cliente!.correo,
            nombreDestino: cliente!.primerNombre + " " + cliente!.segundoNombre,
            contenidoCorreo: "",
            asuntoCorreo: ConfiguracionNotificaciones.CodigoSalaChat,
          };

          let url = ConfiguracionNotificaciones.urlNotificacionesemailServicioFunerario;
          let url2 = ConfiguracionNotificaciones.urlNotificacionesemailCodigoSalaChat;
          console.log("sala" + cliente!.correo + " nombre" + cliente!.primerNombre + "Codigo")
          //this.servicioNotificaciones.EnviarNotificacion(datos, url);
          //this.servicioNotificaciones.EnviarNotificacion(datos2, url2);
          break;
        }
      }
      throw new HttpErrors.NotFound('El beneficiario no existe.');
    }
    return cliente
  }
}
