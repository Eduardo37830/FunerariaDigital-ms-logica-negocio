import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_sala_chat_solicitudServicioFunerarioId: {
        name: 'fk_sala_chat_solicitudServicioFunerarioId',
        entity: 'SolicitudServicioFunerario',
        entityKey: 'id',
        foreignKey: 'solicitudServicioFunerarioId',
      },
    },
  },
})
export class SalaChat extends Entity {
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
  descripcion?: string;

  @property({
    type: 'string',
  })
  codigoUnico: string;

  @property({
    type: 'string',
  })
  llaveMaestra: string;

  @belongsTo(() => SolicitudServicioFunerario)
  solicitudServicioFunerarioId: number;

  constructor(data?: Partial<SalaChat>) {
    super(data);
  }
}

export interface SalaChatRelations {
  // describe navigational properties here
}

export type SalaChatWithRelations = SalaChat & SalaChatRelations;
