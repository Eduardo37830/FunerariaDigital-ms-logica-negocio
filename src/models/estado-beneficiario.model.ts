import {Entity, model, property} from '@loopback/repository';

@model()
export class EstadoBeneficiario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  detalles?: string;


  constructor(data?: Partial<EstadoBeneficiario>) {
    super(data);
  }
}

export interface EstadoBeneficiarioRelations {
  // describe navigational properties here
}

export type EstadoBeneficiarioWithRelations = EstadoBeneficiario & EstadoBeneficiarioRelations;
