import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_beneficiario_clienteId: {
        name: 'fk_beneficiario_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    }
  }
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

  @belongsTo(() => Cliente)
  clienteId: number;

  @hasMany(() => SolicitudServicioFunerario)
  solicitudServicioFunerarios: SolicitudServicioFunerario[];

  constructor(data?: Partial<Beneficiario>) {
    super(data);
  }
}

export interface BeneficiarioRelations {
  // describe navigational properties here
}

export type BeneficiarioWithRelations = Beneficiario & BeneficiarioRelations;
