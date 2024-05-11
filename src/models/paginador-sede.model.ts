import {Model, model, property} from '@loopback/repository';

@model()
export class PaginadorSede extends Model {
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


  constructor(data?: Partial<PaginadorSede>) {
    super(data);
  }
}

export interface PaginadorSedeRelations {
  // describe navigational properties here
}

export type PaginadorSedeWithRelations = PaginadorSede & PaginadorSedeRelations;
