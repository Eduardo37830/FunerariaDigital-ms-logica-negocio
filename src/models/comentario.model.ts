import {Model, model, property} from '@loopback/repository';

@model()
export class Comentario extends Model {
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
  })
  calificacion?: number;


  constructor(data?: Partial<Comentario>) {
    super(data);
  }
}

export interface ComentarioRelations {
  // describe navigational properties here
}

export type ComentarioWithRelations = Comentario & ComentarioRelations;
