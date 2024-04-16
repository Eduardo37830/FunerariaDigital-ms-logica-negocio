import {Model, model, property, hasOne} from '@loopback/repository';
import {Resena} from './resena.model';

@model()
export class SolicitudServicioFunerario extends Model {
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

  @hasOne(() => Resena)
  resena: Resena;

  constructor(data?: Partial<SolicitudServicioFunerario>) {
    super(data);
  }
}

export interface SolicitudServicioFunerarioRelations {
  // describe navigational properties here
}

export type SolicitudServicioFunerarioWithRelations = SolicitudServicioFunerario & SolicitudServicioFunerarioRelations;
