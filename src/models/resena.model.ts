import {Entity, model, property, belongsTo} from '@loopback/repository';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model()
export class Resena extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
  })
  calificacion?: string;

  @property({
    type: 'string',
  })
  comentario?: string;

  @property({
    type: 'number',
  })
  solicitudServicioFunerarioId?: number;

  @belongsTo(() => SolicitudServicioFunerario, {name: 'ResenaSolicitud'})
  Resenaid: number;

  constructor(data?: Partial<Resena>) {
    super(data);
  }
}

export interface ResenaRelations {
  // describe navigational properties here
}

export type ResenaWithRelations = Resena & ResenaRelations;
