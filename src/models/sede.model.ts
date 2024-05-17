import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Administrador} from './administrador.model';
import {Ciudad} from './ciudad.model';
import {Conductor} from './conductor.model';
import {Sala} from './sala.model';

@model({
  settings: {
    foreignKeys: {
      fk_sede_ciudadId: {
        name: 'fk_sede_ciudadId',
        entity: 'Ciudad',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
      fk_sede_administradorId: {
        name: 'fk_sede_administradorId',
        entity: 'Administrador',
        entityKey: 'id',
        foreignKey: 'administradorId',
      },
    },
  },
})
export class Sede extends Entity {
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
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  contacto: string;

  @hasMany(() => Sala)
  salas: Sala[];

  @belongsTo(() => Administrador)
  administradorId: number;

  @hasMany(() => Conductor)
  conductors: Conductor[];

  @belongsTo(() => Ciudad)
  ciudadId: number;

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
