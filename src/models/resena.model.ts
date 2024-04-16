import {Entity, model, property} from '@loopback/repository';

@model()
export class Resena extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
  })
  calificacion?: string;

  @property({
    type: 'string',
  })
  comentario?: string;


  constructor(data?: Partial<Resena>) {
    super(data);
  }
}

export interface ResenaRelations {
  // describe navigational properties here
}

export type ResenaWithRelations = Resena & ResenaRelations;
