import {Entity, model, property} from '@loopback/repository';

@model()
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
    required: true,
  })
  responsabilidades: string;

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


  constructor(data?: Partial<Conductor>) {
    super(data);
  }
}

export interface ConductorRelations {
  // describe navigational properties here
}

export type ConductorWithRelations = Conductor & ConductorRelations;