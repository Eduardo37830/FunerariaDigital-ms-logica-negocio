import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {ServicioPlan} from './servicio-plan.model';
import {Servicio} from './servicio.model';
import {Cliente} from './cliente.model';
import {ClientePlan} from './cliente-plan.model';

@model({
  settings: {
    foreignKeys: {
      fk_plan_administradorId: {
        name: 'fk_plan_administradorId',
        entity: 'Administrador',
        entityKey: 'id',
        foreignKey: 'administradorId',
      },
    },
  },
})
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

  @hasMany(() => Cliente, {through: {model: () => ClientePlan}})
  clientes: Cliente[];

  constructor(data?: Partial<Plan>) {
    super(data);
  }
}

export interface PlanRelations {
  // describe navigational properties here
}

export type PlanWithRelations = Plan & PlanRelations;
