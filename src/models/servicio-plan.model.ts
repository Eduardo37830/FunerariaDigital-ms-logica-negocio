import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_servicioPlan_servicioId: {
        name: 'fk_servicioPlan_servicioId',
        entity: 'Servicio',
        entityKey: 'id',
        foreignKey: 'servicioId',
      },
      fk_servicioPlan_planId: {
        name: 'fk_servicioPlan_planId',
        entity: 'Plan',
        entityKey: 'id',
        foreignKey: 'planId',
      },
    }
  }
})
export class ServicioPlan extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  idServicio: number;

  @property({
    type: 'string',
    required: true,
  })
  detalles: string;

  @property({
    type: 'number',
  })
  planId?: number;

  @property({
    type: 'number',
  })
  servicioId?: number;

  constructor(data?: Partial<ServicioPlan>) {
    super(data);
  }
}

export interface ServicioPlanRelations {
  // describe navigational properties here
}

export type ServicioPlanWithRelations = ServicioPlan & ServicioPlanRelations;
