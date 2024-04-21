import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {EstadoBeneficiario} from './estado-beneficiario.model';

@model({
  settings: {
    foreignKeys: {
      fk_estadoBeneficiarioId: {
        name: 'fk_estadoBeneficiarioId',
        entity: 'EstadoBeneficiario',
        entityKey: 'id',
        foreignKey: 'estadoBeneficiarioId',
      },
      fk_clienteId: {
        name: 'fk_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class Beneficiario extends Entity {
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

  @property({
    type: 'string',
  })
  foto?: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudadResidencia: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => EstadoBeneficiario)
  estadoBeneficiarioId: number;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
