import {Entity, model, property} from '@loopback/repository';

@model()
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

  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
