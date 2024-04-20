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

  /**
   * Valida un código de 2fa para un usuario
   * @param credenciales2fa credenciales del usuario con el código del 2fa
   * @returns el registro de login o null
   */
  /*async validarCodigoSlaChat(credenciales2fa: FactorDeAutentificacionPorCodigo): Promise<Usuario | null> {
    let login = await this.repositorioLogin.findOne({
      where: {
        usuarioId: credenciales2fa.usuarioId,
        codigo2fa: credenciales2fa.codigo2fa,
        estadoCodigo2fa: false
      }
    });
    if (login) {
      let usuario = await this.repositorioUsuario.findById(credenciales2fa.usuarioId);
      return usuario;
    }
    return null;
  }*/
}
