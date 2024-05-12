import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Comentario} from './comentario.model';
import {Conductor} from './conductor.model';
import {EstadoServicio} from './estado-servicio.model';
import {Sala} from './sala.model';
import {SolicitudServicioFunerario} from './solicitud-servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_servicioFunerario_solicitudServicioFunerarioId: {
        name: 'fk_servicioFunerario_solicitudServicioFunerarioId',
        entity: 'SolicitudServicioFunerario',
        entityKey: 'id',
        foreignKey: 'solicitudServicioFunerarioId',
      },
      fk_servicioFunerario_salaId: {
        name: 'fk_servicioFunerario_salaId',
        entity: 'Sala',
        entityKey: 'id',
        foreignKey: 'salaId',
      }
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

  @belongsTo(() => SolicitudServicioFunerario)
  solicitudServicioFunerarioId: number;

  @hasMany(() => Comentario)
  comentarios: Comentario[];

  @hasMany(() => Conductor)
  conductors: Conductor[];

  @hasMany(() => EstadoServicio)
  estadoServicios: EstadoServicio[];

  @belongsTo(() => Sala)
  salaId: number;

  constructor(data?: Partial<ServicioFunerario>) {
    super(data);
  }
}

export interface ServicioFunerarioRelations {
  // describe navigational properties here
}

export type ServicioFunerarioWithRelations = ServicioFunerario & ServicioFunerarioRelations;
