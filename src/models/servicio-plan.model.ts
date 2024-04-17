import {Entity, model, property} from '@loopback/repository';

@model()
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
  idPlan: number;

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
