import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {ConfiguracionPagos} from '../config/configuracion.pagos';

@injectable({scope: BindingScope.TRANSIENT})
export class EpaycoService {
  private epayco;

  constructor() {
    this.epayco = require('epayco-sdk-node')({
      apiKey: ConfiguracionPagos.apiKey,
      privateKey: ConfiguracionPagos.privateKey,
      lang: 'ES',
      test: true,
    });
  }

  async obtenerTransacciones(): Promise<any> {
    try {
      // Usa el método correcto según la documentación de ePayco
      const transacciones = await this.epayco.subscriptions.list(); // Asegúrate de usar el método correcto
      return transacciones.data; // Asegúrate de devolver los datos correctos
    } catch (error) {
      console.error('Error al obtener transacciones de ePayco:', error);
      throw new HttpErrors.InternalServerError('Error al obtener transacciones de ePayco');
    }
  }
}
