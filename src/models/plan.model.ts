import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Servicio} from './servicio.model';
import {ServicioPlan} from './servicio-plan.model';
import {Administrador} from './administrador.model';

@model()
export class Plan extends Entity {
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

  @property({
    type: 'number',
    required: true,
  })
  mensualidad: number;

  @property({
    type: 'number',
    required: true,
  })
  cantidadBeneficios: number;

  @hasMany(() => Servicio, {through: {model: () => ServicioPlan}})
  servicios: Servicio[];

  @belongsTo(() => Administrador)
  administradorId: number;

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
