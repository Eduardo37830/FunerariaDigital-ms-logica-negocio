import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Comentario} from './comentario.model';
import {SalaChat} from './sala-chat.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitudServicioFunerario_comentarioId: {
        name: 'fk_solicitudServicioFunerario_comentarioId',
        entity: 'Comentario',
        entityKey: 'id',
        foreignKey: 'comentarioId',
      },
      fk_solicitudServicioFunerario_salaChatId: {
        name: 'fk_solicitudServicioFunerario_salaChatId',
        entity: 'SalaChat',
        entityKey: 'id',
        foreignKey: 'salaChatId',
      },
      //clienteId
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
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  ubicacionDelCuerpo: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoUnicoServicio: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: boolean;

  @hasMany(() => ServicioFunerario)
  servicioFunerarios: ServicioFunerario[];

  @belongsTo(() => Comentario)
  comentarioId: number;

  @belongsTo(() => SalaChat)
  salaChatId: number;

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
