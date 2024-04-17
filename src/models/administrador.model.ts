import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Plan} from './plan.model';

@model()
export class Administrador extends Entity {
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
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
  })
  estado?: string;

  @property({
    type: 'date',
  })
  fechaRegistro?: string;

  @hasOne(() => Sede)
  sede: Sede;

  @hasMany(() => Plan)
  plans: Plan[];

  constructor(data?: Partial<Administrador>) {
    super(data);
  }
}

export interface AdministradorRelations {
  // describe navigational properties here
}

export type AdministradorWithRelations = Administrador & AdministradorRelations;
