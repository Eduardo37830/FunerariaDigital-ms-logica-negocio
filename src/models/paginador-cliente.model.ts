import {Model, model, property} from '@loopback/repository';

@model()
export class PaginadorCliente extends Model {
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


  constructor(data?: Partial<PaginadorCliente>) {
    super(data);
  }
}

export interface PaginadorClienteRelations {
  // describe navigational properties here
}

export type PaginadorClienteWithRelations = PaginadorCliente & PaginadorClienteRelations;
