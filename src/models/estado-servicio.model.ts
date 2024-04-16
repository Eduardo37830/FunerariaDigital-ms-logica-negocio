import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<EstadoServicio>) {
    super(data);
  }
}

export interface EstadoServicioRelations {
  // describe navigational properties here
}

export type EstadoServicioWithRelations = EstadoServicio & EstadoServicioRelations;
