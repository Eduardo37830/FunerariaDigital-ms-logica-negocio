import {Entity, Model, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';
import {Comentario} from './comentario.model';
import {SalaChat} from './sala-chat.model';

@model()
export class SolicitudServicioFunerario extends Entity {
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
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacionDelCuerpo: string;

  @property({
    type: 'boolean',
    required: true,
  })
  traslado: boolean;

  @property({
    type: 'string',
    required: true,
  })
  tipoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoUnicoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: boolean;

  @hasMany(() => ServicioFunerario)
  servicioFunerarios: ServicioFunerario[];

  @belongsTo(() => Comentario)
  comentarioId: number;

  @belongsTo(() => SalaChat)
  salaChatId: number;

  constructor(data?: Partial<SolicitudServicioFunerario>) {
    super(data);
  }
}

export interface SolicitudServicioFunerarioRelations {
  // describe navigational properties here
}

export type SolicitudServicioFunerarioWithRelations = SolicitudServicioFunerario & SolicitudServicioFunerarioRelations;
