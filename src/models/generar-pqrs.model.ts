import {Entity, model, property} from '@loopback/repository';

@model()
export class GenerarPqrs extends Entity {
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
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  pqrs: string;

  constructor(data?: Partial<GenerarPqrs>) {
    super(data);
  }
}

export interface GenerarPqrsRelations {
  // describe navigational properties here
}

export type GenerarPqrsWithRelations = GenerarPqrs & GenerarPqrsRelations;
