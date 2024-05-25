import {Entity, hasMany, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {ClientePlan} from './cliente-plan.model';
import {Plan} from './plan.model';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model()
export class Cliente extends Entity {
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
    default: () => new Date()
  })
  fechaRegistro: Date;

  @property({
    type: 'boolean',
    required: true,
  })
  activo: boolean;

  @property({
    type: 'string',
    required: true,
  })
  _idSeguridad?: string;

  @hasMany(() => Plan, {through: {model: () => ClientePlan}})
  plans: Plan[];

  @hasMany(() => Beneficiario)
  beneficiarios: Beneficiario[];

  @hasMany(() => SolicitudServicioFunerario)
  solicitudServicioFunerarios: SolicitudServicioFunerario[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
