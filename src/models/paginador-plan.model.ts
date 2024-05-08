import {Model, model, property} from '@loopback/repository';
import {Plan} from './plan.model';

@model()
export class PaginadorPlan extends Model {
  @property({
    type: 'number',
    required: true,
  })
  totalRegistros: number;

  @property({
    type: 'array',
    itemType: 'Plan',
    required: true,
  })
  registros: Plan[];


  constructor(data?: Partial<PaginadorPlan>) {
    super(data);
  }
}

export interface PaginadorPlanRelations {
  // describe navigational properties here
}

export type PaginadorPlanWithRelations = PaginadorPlan & PaginadorPlanRelations;
