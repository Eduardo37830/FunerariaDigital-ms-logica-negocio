import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Sala} from './sala.model';
import {Conductor} from './conductor.model';
import {EstadoServicio} from './estado-servicio.model';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model()
export class ServicioFunerario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  traslado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @belongsTo(() => Sala)
  salaId: number;

  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => EstadoServicio)
  estadoServicioId: number;

  @belongsTo(() => SolicitudServicioFunerario)
  solicitudServicioFunerarioId: number;

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;
