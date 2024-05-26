import {BindingScope, injectable} from '@loopback/core';
import {ConfiguracionPagos} from '../config/configuracion.pagos';

const fetch = require('node-fetch');
const epayco = require('epayco-sdk-node')({
  apiKey: ConfiguracionPagos.apiKey,
  privateKey: ConfiguracionPagos.privateKey,
  lang: 'ES',
  test: true,
});
const axios = require('axios');


const createToken = async () => {
  const creditInfo = {
    "card[number]": "4575623182290326",
    "card[exp_year]": "2025",
    "card[exp_month]": "12",
    "card[cvc]": "123",
    "hasCvv": true
  };

  try {
    const token = await epayco.token.create(creditInfo);
    console.log(token);
    return token;
  } catch (error) {
    console.error("Error al crear el token:", error);
    throw error;
  }
};


@injectable({scope: BindingScope.TRANSIENT})
export class EpaycoService {
  constructor() { }

  /*async crearPagoPrueba(monto: number, moneda: string) {
    try {
      const datos = {
        amount: monto,
        currency: moneda,
        lang: 'ES',
        test: true,  // Indicador de pago de prueba

        // API Key y Private Key de prueba
        apiKey: ConfiguracionPagos.apiKey,
        privateKey: ConfiguracionPagos.privateKey,
      };

      const respuesta = await axios.post('https://funerariaDigital.epayco.me/payment/process', datos, createToken);
      console.log('Respuesta de Epayco:', respuesta.data);  // Log para verificar la respuesta de Epayco
      return respuesta.data;
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      throw error;
    }
  }*/

  async crearPagoPrueba(params: any): Promise<any> {
    try {
      // Aquí deberías llamar al endpoint de Epayco para crear la sesión
      // Supongamos que la API de Epayco espera los parámetros en el body de la solicitud
      const response = await axios.post('https://api.epayco.co/session', params, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ConfiguracionPagos.apiKey}`,
        },
      });

      if (response.data.success) {
        return {sessionId: response.data.data.sessionId};
      } else {
        throw new Error('Error al crear la sesión');
      }
    } catch (error) {
      console.error('Error al crear la sesión:', error);
      throw error;
    }
  }
}
