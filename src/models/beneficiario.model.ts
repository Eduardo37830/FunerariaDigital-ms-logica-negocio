import {Entity, model, property} from '@loopback/repository';

@model()
export class Beneficiario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idBeneficiario?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
  })
  documento?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: string;


  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;