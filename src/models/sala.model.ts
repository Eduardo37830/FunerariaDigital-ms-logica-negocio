import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';
import {Sede} from './sede.model';

@model()
export class Sala extends Entity {
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
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'date',
    required: true,
  })
  horaEntradaCuerpo: Date;

  @property({
    type: 'date',
    required: true,
  })
  horaSalidaCuerpo: Date;

  @property({
    type: 'boolean',
    required: true,
  })
  disponible: boolean;

  @hasMany(() => ServicioFunerario)
  servicioFunerarios: ServicioFunerario[];

  @belongsTo(() => Sede)
  sedeId: number;

  constructor(data?: Partial<Sala>) {
    super(data);
  }
}

export interface SalaRelations {
  // describe navigational properties here
}

export type SalaWithRelations = Sala & SalaRelations;
