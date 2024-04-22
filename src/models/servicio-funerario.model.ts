import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Comentario} from './comentario.model';
import {Conductor} from './conductor.model';
import {EstadoServicio} from './estado-servicio.model';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';
import {Sala} from './sala.model';

@model({
  settings: {
    foreignKeys: {
      fk_servicioFunerario_conductorId: {
        name: 'fk_servicioFunerario_conductorId',
        entity: 'Conductor',
        entityKey: 'id',
        foreignKey: 'conductorId',
      },
      fk_servicioFunerario_estadoServicioId: {
        name: 'fk_servicioFunerario_estadoServicioId',
        entity: 'EstadoServicio',
        entityKey: 'id',
        foreignKey: 'estadoServicioId',
      },
      fk_servicioFunerario_solicitudServicioFunerarioId: {
        name: 'fk_servicioFunerario_solicitudServicioFunerarioId',
        entity: 'SolicitudServicioFunerario',
        entityKey: 'id',
        foreignKey: 'solicitudServicioFunerarioId',
      },
      fk_servicioFunerario_comentarioId: {
        name: 'fk_servicioFunerario_comentarioId',
        entity: 'Comentario',
        entityKey: 'id',
        foreignKey: 'comentarioId',
      },
    },
  },
})
export class ServicioFunerario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  traslado: boolean;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'string',
    required: true,
  })
  codigoUnicoServicio: string;

  @belongsTo(() => Conductor)
  conductorId: number;

  @belongsTo(() => EstadoServicio)
  estadoServicioId: number;

  @belongsTo(() => SolicitudServicioFunerario)
  solicitudServicioFunerarioId: number;

  @belongsTo(() => Comentario)
  comentarioId: number;

  @hasMany(() => Sala)
  salas: Sala[];

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;
