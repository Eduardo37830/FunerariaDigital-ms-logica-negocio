import { /* inject, */ BindingScope, injectable} from '@loopback/core';

const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})

export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) { }

  /**
   * Envía una notificación mediante una solicitud POST.
   * @param datos Los datos a enviar en la solicitud.
   * @param url La URL del endpoint al que se enviará la solicitud.
   */
  async EnviarNotificacion(datos: any, url: string) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(datos),
        headers: {'Content-Type': 'application/json'},
      });

      if (!response.ok) {
        throw new Error(`La solicitud falló con código de estado ${response.status}`);
      }

      // Verificar si la respuesta es un JSON válido
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('Respuesta del servidor:', responseData);
      } else {
        // La respuesta no es un JSON válido, por lo que es probable que sea un mensaje de texto
        const responseText = await response.text();
        console.log('Respuesta del servidor (texto):', responseText);
      }
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
    }
  }



}


