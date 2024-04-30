import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Sede} from './sede.model';
import {ServicioFunerario} from './servicio-funerario.model';

@model({
  settings: {
    foreignKeys: {
      fk_conductor_sedeId: {
        name: 'fk_conductor_sedeId',
        entity: 'Sede',
        entityKey: 'id',
        foreignKey: 'sedeId',
      },
      fk_conductor_servicioFunerarioId: {
        name: 'fk_conductor_servicioFunerarioId',
        entity: 'ServicioFunerario',
        entityKey: 'id',
        foreignKey: 'servicioFunerarioId',
      },
    },
  }
})
export class Conductor extends Entity {
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
    type: 'string',
    required: true,
  })
  responsabilidades?: string;

  @belongsTo(() => Sede)
  sedeId: number;

  @belongsTo(() => ServicioFunerario)
  servicioFunerarioId: number;

  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;
