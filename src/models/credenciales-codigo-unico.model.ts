import {Model, model, property} from '@loopback/repository';

@model()
export class CredencialesCodigoUnico extends Model {
  @property({
    type: 'string',
    required: true,
  })
  codigoUnico: string;


  constructor(data?: Partial<CredencialesCodigoUnico>) {
    super(data);
  }
}

export interface CredencialesCodigoUnicoRelations {
  // describe navigational properties here
}

export type CredencialesCodigoUnicoWithRelations = CredencialesCodigoUnico & CredencialesCodigoUnicoRelations;
