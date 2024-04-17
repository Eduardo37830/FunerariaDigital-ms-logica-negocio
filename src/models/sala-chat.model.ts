import {Entity, Model, model, property, hasOne} from '@loopback/repository';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model()
export class SalaChat extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  capacidad?: number;

  @property({
    type: 'string',
  })
  mensaje?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasOne(() => SolicitudServicioFunerario)
  solicitudServicioFunerario: SolicitudServicioFunerario;

  constructor(data?: Partial<SalaChat>) {
    super(data);
  }
}

export interface SalaChatRelations {
  // describe navigational properties here
}

export type SalaChatWithRelations = SalaChat & SalaChatRelations;
