import {Entity, hasMany, model, property, belongsTo} from '@loopback/repository';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';
import {Cliente} from './cliente.model';

@model({
  settings: {
    foreignKeys: {
      fk_clienteId: {
        name: 'fk_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      }
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
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

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

  @property({
    type: 'date',
    required: true,
  })
  fechaRegistro: Date;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @hasMany(() => SolicitudServicioFunerario)
  solicitudServicioFunerarios: SolicitudServicioFunerario[];

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
