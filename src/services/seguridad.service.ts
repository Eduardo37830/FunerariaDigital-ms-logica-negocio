import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente, GenerarPqrs, ServicioFunerario} from '../models';
import {ClienteRepository, SalaChatRepository, ServicioFunerarioRepository} from '../repositories';
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
    @repository(ServicioFunerarioRepository)
    public repositoryServicioFunerario: ServicioFunerarioRepository
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

  /**
   * Obtener los datos del Servicio Funerario con el CodigoUnico
   * @param CodigoUnico CodigoUnico del Servicio Funerario
   * @returns Servicio Funerario encontrado
   * @throws Error si no se encuentra el Servicio Funerario
   * @throws Error si el Servicio Funerario no esta activo
   * @throws Error si el Servicio Funerario no tiene cupo
   * @throws Error si el Servicio Funerario no tiene cupo para el tipo de Beneficiario
   * @throws Error si el Servicio Funerario no tiene cupo para el tipo de Beneficiario
   *
    */
  async obtenerServicioFunerario(CodigoUnico: string): Promise<ServicioFunerario | undefined> {
    let ServicioFunerario = await this.repositoryServicioFunerario.findOne({
      where: {
        codigoUnicoServicio: CodigoUnico
      }
    });
    if (!ServicioFunerario) {
      throw new Error('No se encontro el Servicio Funerario');
    }
    return ServicioFunerario;
  }


}
