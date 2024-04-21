import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {SalaChat} from '../models';
import {Credenciales} from '../models/credenciales.model';
import {SalaChatRepository} from '../repositories';
const generator = require('generate-password');
const MD5 = require("crypto-js/md5");
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SeguridadService {
  constructor(
    @repository(SalaChatRepository)
    public repositorioSalaChat: SalaChatRepository
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
   * Se busca un usuario por sus credenciales de acceso
   * @param credenciales credenciales del usuario
   * @returns usuario encontrado o null
   */
  async identificarSolicitud(credenciales: Credenciales): Promise<SalaChat | null> {
    let salaChat = await this.repositorioSalaChat.findOne({
      where: {
        id: credenciales.id,
      }
    });
    console.log(salaChat)
    return salaChat as SalaChat
  }

  /**validarCodigoSalaChat*/
}
