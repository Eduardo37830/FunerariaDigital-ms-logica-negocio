export namespace ConfiguracionNotificaciones {
  export const CodigoSalaChat: string = "Codigo para unirse a la sala";
  export const datosServicioSolicitado: string = "Datos Difunto";
  export const urlNotificacionesemailServicioFunerario: string = "http://localhost:5132/Notificaciones/enviar-correo-datos-servicio";
  export const urlNotificacionesemailCodigoSalaChat: string = "http://localhost:5132/Notificaciones/enviar-correo-sala-chat";
  export const urlNotificacionesSms: string = "http://localhost:5132/Notificaciones/enviar-sms";
  export const urlNotificaciones2fa: string = "http://localhost:5132/Notificaciones/"; //Envio de codigo para unirse al Chat
  //Mensajes sobre servicios funerarios - estados de esos, etc
  export const urlNotificacionesPQRS: string = "http://localhost:5132/Notificaciones/enviar-pqrs";
}
