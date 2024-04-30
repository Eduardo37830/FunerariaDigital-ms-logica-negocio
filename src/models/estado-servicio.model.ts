import {belongsTo, Entity, model, property} from '@loopback/repository';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_estadoServicio_servicioFunerarioId: {
        name: 'fk_estadoServicio_servicioFunerarioId',
        entity: 'ServicioFunerario',
        entityKey: 'id',
        foreignKey: 'servicioFunerarioId',
      },
    },
  },
})
export class EstadoServicio extends Entity {
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
    type: 'string',
  })
  detalles?: string;

  @belongsTo(() => ServicioFunerario)
  servicioFunerarioId: number;

  constructor(data?: Partial<EstadoServicio>) {
    super(data);
  }
}

export interface EstadoServicioRelations {
  // describe navigational properties here
}

export type EstadoServicioWithRelations = EstadoServicio & EstadoServicioRelations;
