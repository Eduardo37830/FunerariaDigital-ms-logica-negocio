import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plan} from './plan.model';
import {ServicioPlan} from './servicio-plan.model';

@model()
export class Servicio extends Entity {
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
    type: 'string',
    required: true,
  })
  detalles: string;

  @hasMany(() => Plan, {through: {model: () => ServicioPlan}})
  plans: Plan[];

  constructor(data?: Partial<Servicio>) {
    super(data);
  }
}

export interface ServicioRelations {
  // describe navigational properties here
}

export type ServicioWithRelations = Servicio & ServicioRelations;
