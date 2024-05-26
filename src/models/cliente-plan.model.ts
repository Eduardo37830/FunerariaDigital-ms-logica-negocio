import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_clientePlan_clienteId: {
        name: 'fk_clientePlan_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
      fk_clientePlan_planId: {
        name: 'fk_clientePlan_planId',
        entity: 'Plan',
        entityKey: 'id',
        foreignKey: 'planId',
      },
    }

  }
})
export class ClientePlan extends Entity {
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
  tarifa: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaAdquisicion: Date;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimiento: Date;

  @property({
    type: 'number',
    required: true,
  })
  cantidadBeneficiarios: number;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @property({
    type: 'number',
  })
  clienteId?: number;

  @property({
    type: 'number',
  })
  planId?: number;

  constructor(data?: Partial<ClientePlan>) {
    super(data);
  }
}

export interface ClientePlanRelations {
  // describe navigational properties here
}

export type ClientePlanWithRelations = ClientePlan & ClientePlanRelations;
