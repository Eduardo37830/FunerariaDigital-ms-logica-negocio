import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Sala} from './sala.model';
import {Administrador} from './administrador.model';
import {Conductor} from './conductor.model';

@model()
export class Sede extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  idCiudad?: number;

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

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasMany(() => Sala)
  salas: Sala[];

  @belongsTo(() => Administrador)
  administradorId: number;

  @hasMany(() => Conductor)
  conductors: Conductor[];

  constructor(data?: Partial<Sede>) {
    super(data);
  }
}

export interface SedeRelations {
  // describe navigational properties here
}

export type SedeWithRelations = Sede & SedeRelations;
