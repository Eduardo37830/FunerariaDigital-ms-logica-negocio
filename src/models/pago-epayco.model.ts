import {Entity, model, property} from '@loopback/repository';

@model()
export class PagoEpayco extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number; // Monto del pago

  @property({
    type: 'string',
    required: true,
  })
  currency: string; // Moneda del pago

  @property({
    type: 'boolean',
    required: true,
  })
  textMode: true; // Indicador de pago de prueba

  @property({
    type: 'string',
    required: true,
  })
  estado: string; // Estado del pago

  constructor(data?: Partial<PagoEpayco>) {
    super(data);
  }
}

export interface PagoEpaycoRelations {
  // describe navigational properties here
}

export type PagoEpaycoWithRelations = PagoEpayco & PagoEpaycoRelations;
