import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PaginadorCiudad extends Model {
  @property({
    type: 'number',
    required: true,
  })
  totalRegistros: number;

  @property({
    type: 'number',
    required: true,
  })
  registros: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<PaginadorCiudad>) {
    super(data);
  }
}

export interface PaginadorCiudadRelations {
  // describe navigational properties here
}

export type PaginadorCiudadWithRelations = PaginadorCiudad & PaginadorCiudadRelations;
