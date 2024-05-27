import {BindingScope, injectable} from '@loopback/core';
import {ConfiguracionPagos} from '../config/configuracion.pagos';

var epayco = require('epayco-sdk-node')({
  apiKey: ConfiguracionPagos.apiKey,
  privateKey: ConfiguracionPagos.privateKey,
  lang: 'ES',
  test: true
})

/*var credit_info = {
  "card[number]": "4575623182290326",
  "card[exp_year]": "2025",
  "card[exp_month]": "12",
  "card[cvc]": "123",
  "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
}

epayco.token.create(credit_info)
  .then(function (token: any) {
    console.log(token);
  })
  .catch(function (err: string) {
    console.log("err: " + err);
  });

var customer_info = {
  token_card: "toke_id",
  name: "Joe",
  last_name: "Doe",
  email: "joe@payco.co",
  default: true,
  //Optional parameters: These parameters are important when validating the credit card transaction
  city: "Bogota",
  address: "Cr 4 # 55 36",
  phone: "3005234321",
  cell_phone: "3010000001"
}*/

@injectable({scope: BindingScope.TRANSIENT})
export class EpaycoService {

  constructor() {
  }

  async createToken(creditInfo: any) {
    try {
      const token = await epayco.token.create(creditInfo);
      return token;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createPlan(planInfo: any): Promise<any> {
    try {
      const plan = await epayco.plans.create(planInfo);
      return plan;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async getPlan(idPlan: string): Promise<any> {
    try {
      const plan = await epayco.plans.get(idPlan);
      return plan;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  async listPlans(): Promise<any> {
    try {
      const plans = await epayco.plans.list();
      return plans;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
