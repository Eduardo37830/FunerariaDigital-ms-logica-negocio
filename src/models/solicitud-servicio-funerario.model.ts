import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Beneficiario} from './beneficiario.model';
import {SalaChat} from './sala-chat.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitudServicioFunerario_beneficiarioId: {
        name: 'fk_solicitudServicioFunerario_beneficiarioId',
        entity: 'Beneficiario',
        entityKey: 'id',
        foreignKey: 'beneficiarioId',
      }
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

  @hasMany(() => ServicioFunerario)
  servicioFunerarios: ServicioFunerario[];

  @hasMany(() => SalaChat)
  salaChats: SalaChat[];

  @belongsTo(() => Beneficiario)
  beneficiarioId: number;

  constructor(data?: Partial<SolicitudServicioFunerario>) {
    super(data);
  }
}

export interface SolicitudServicioFunerarioRelations {
  // describe navigational properties here
}

export type SolicitudServicioFunerarioWithRelations = SolicitudServicioFunerario & SolicitudServicioFunerarioRelations;
