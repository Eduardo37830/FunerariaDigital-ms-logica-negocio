import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {SalaChat} from './sala-chat.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitud_servicio_funerario_clienteId: {
        name: 'fk_solicitud_servicio_funerario_clienteId',
        entity: 'Cliente',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class SolicitudServicioFunerario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: Date;

  @property({
    type: 'string',
    required: true,
  })
  ubicacionDelCuerpo: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoServicio: string; //servicio de sepultura tradicional o si el cuerpo es cremado.

  @property({
    type: 'boolean',
    required: true,
  })
  estadoAceptado: boolean;

  @property({
    type: 'number',
    required: true,
  })
  idBeneficiario: number;

  @hasMany(() => ServicioFunerario)
  servicioFunerarios: ServicioFunerario[];

  @hasMany(() => SalaChat)
  salaChats: SalaChat[];

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<SolicitudServicioFunerario>) {
    super(data);
  }
}

export interface SolicitudServicioFunerarioRelations {
  // describe navigational properties here
}

export type SolicitudServicioFunerarioWithRelations = SolicitudServicioFunerario & SolicitudServicioFunerarioRelations;
