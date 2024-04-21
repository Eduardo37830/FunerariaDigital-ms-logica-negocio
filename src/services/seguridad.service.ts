import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Cliente, GenerarPqrs} from '../models';
import {ClienteRepository, SalaChatRepository} from '../repositories';
const generator = require('generate-password');
const MD5 = require("crypto-js/md5");
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadService {
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

  /**validarCodigoSalaChat*/
}
