import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Sede} from './sede.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_sala_sedeId: {
        name: 'fk_sala_sedeId',
        entity: 'Sede',
        entityKey: 'id',
        foreignKey: 'sedeId',
      },
      fk_sala_servicioFunerarioId: {
        name: 'fk_sala_servicioFunerarioId',
        entity: 'ServicioFunerario',
        entityKey: 'id',
        foreignKey: 'servicioFunerarioId',
      },
    },
  },
})
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

  @belongsTo(() => Sede)
  sedeId: number;

  @belongsTo(() => ServicioFunerario)
  servicioFunerarioId: number;

  constructor(data?: Partial<Sala>) {
    super(data);
  }
}

export interface SalaRelations {
  // describe navigational properties here
}

export type SalaWithRelations = Sala & SalaRelations;
