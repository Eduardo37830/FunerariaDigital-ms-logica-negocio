import {Model, model, property} from '@loopback/repository';

@model()
export class PaginadorDepartamento extends Model {
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


  constructor(data?: Partial<PaginadorDepartamento>) {
    super(data);
  }
}

export interface PaginadorDepartamentoRelations {
  // describe navigational properties here
}

export type PaginadorDepartamentoWithRelations = PaginadorDepartamento & PaginadorDepartamentoRelations;
