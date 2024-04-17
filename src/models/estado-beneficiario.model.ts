import {Entity, model, property, hasMany} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';

@model()
export class EstadoBeneficiario extends Entity {
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
  })
  detalles?: string;

  @hasMany(() => Beneficiario)
  beneficiarios: Beneficiario[];

  constructor(data?: Partial<EstadoBeneficiario>) {
    super(data);
  }
}

export interface EstadoBeneficiarioRelations {
  // describe navigational properties here
}

export type EstadoBeneficiarioWithRelations = EstadoBeneficiario & EstadoBeneficiarioRelations;
