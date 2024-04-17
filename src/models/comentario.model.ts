import {Entity, Model, model, property, hasMany} from '@loopback/repository';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model()
export class Comentario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaPublicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  @property({
    type: 'number',
  })
  calificacion?: number;

  @hasMany(() => SolicitudServicioFunerario)
  solicitudServicioFunerarios: SolicitudServicioFunerario[];

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
