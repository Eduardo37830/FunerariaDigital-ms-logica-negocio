import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_comentario_servicioFunerarioId: {
        name: 'fk_comentario_servicioFunerarioId',
        entity: 'ServicioFunerario',
        entityKey: 'id',
        foreignKey: 'servicioFunerarioId',
      },
    },
  }
})
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
    required: true,
  })
  calificacion: number;

  @belongsTo(() => ServicioFunerario)
  servicioFunerarioId: number;

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
