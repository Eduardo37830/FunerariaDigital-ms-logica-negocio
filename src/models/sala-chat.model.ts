import {Model, model, property} from '@loopback/repository';

@model()
export class SalaChat extends Model {
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
    type: 'number',
  })
  capacidad?: number;

  @property({
    type: 'string',
  })
  mensaje?: string;

  @property({
    type: 'string',
  })
  descripcion?: string;


  constructor(data?: Partial<SalaChat>) {
    super(data);
  }
}

export interface SalaChatRelations {
  // describe navigational properties here
}

export type SalaChatWithRelations = SalaChat & SalaChatRelations;
