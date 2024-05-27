import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ConfiguracionPagos} from '../config/configuracion.pagos';
import {ClientePlan, Plan} from '../models';
import {
  ClientePlanRepository,
  ClienteRepository,
  PlanRepository,
} from '../repositories';
import {NotificacionesService} from '../services';

export class ClientePlanController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(PlanRepository)
    public planRepository: PlanRepository,
    @repository(ClientePlanRepository)
    public clientePlanRepository: ClientePlanRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) { }

  @get('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Plan through ClientePlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClientePlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientePlan>,
  ): Promise<ClientePlan[]> {
    return this.clientePlanRepository.find(filter);
  }
  //@authenticate
  @post('/adquirir-plan', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async adquirirPlan(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {
            title: 'NewClientePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    clientePlanData: Omit<ClientePlan, 'id'>,
  ): Promise<ClientePlan> {
    // Verifica si el cliente existe y está activo
    const cliente = await this.clienteRepository.findById(
      clientePlanData.clienteId,
    );
    console.log(cliente.activo);

    if (!cliente || !cliente.activo) {
      throw new HttpErrors.NotFound(
        `Cliente con ID ${clientePlanData.clienteId} no encontrado o inactivo`,
      );
    }
    {
      // Verifica si el plan existe
      const planExists = await this.planRepository.exists(
        clientePlanData.planId,
      );
      if (!planExists) {
        throw new HttpErrors.NotFound(
          `Plan con ID ${clientePlanData.planId} no encontrado`,
        );
      }

      // Configuración de Epayco
      const epayco = require('epayco-sdk-node')({
        apiKey: ConfiguracionPagos.apiKey,
        privateKey: ConfiguracionPagos.privateKey,
        lang: 'ES',
        test: true
      })

      //Datos de la tarjeta de crédito de Prueba de Epaycpo
      //  --- No cambiar
      const credit_info = {
        "card[number]": "4575623182290326",
        "card[exp_year]": "2025",
        "card[exp_month]": "12",
        "card[cvc]": "123",
        "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
      }

      epayco.token.create(credit_info)
        .then(function (token: any) {
          console.log(token);
          console.log("Transacción exitosa" + token);
        })
        .catch(function (err: string) {
          console.log("err: " + err);
        });

      const customer_info = {
        token_card: "toke_id",
        name: cliente.primerNombre,
        last_name: cliente.primerApellido,
        email: cliente.correo,
        default: true,
        //Optional parameters: These parameters are important when validating the credit card transaction
        city: cliente.ciudadResidencia,
        address: cliente.direccion,
        phone: cliente.celular,
        cell_phone: "3010000001"
      }

      console.log('customer_info', customer_info);

      // Crea la nueva asociación ClientePlan
      console.log('PLAN AQUIRIDO!!!');

      return this.clientePlanRepository.create(clientePlanData);
    }
  }

  @get('/cliente-plan-paginado')
  @response(200, {
    description: 'Array of ClientePlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    },
  })
  async findToPagination(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientePlan>, // Updated type to Filter<ClientePlan>
  ): Promise<object> {
    const total: number = (await this.clienteRepository.count()).count;
    const registros: ClientePlan[] = await this.clientePlanRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total
    }
    return respuesta;
  }

  @patch('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Cliente.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clienteRepository.plans(id).patch(plan, where);
  }

  //@authenticate
  @del('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Cliente.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clienteRepository.plans(id).delete(where);
  }

  // Nueva función GET para obtener una relación específica ClientePlan
  @get('/obtener-plan/{id}', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async obtenerPlan(
    @param.path.number('id') id: number, // Recibimos la ID del ClientePlan desde la ruta
  ): Promise<ClientePlan> {
    const clientePlan = await this.clientePlanRepository.findById(id); // Buscamos el ClientePlan por su ID

    if (!clientePlan) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }

    return clientePlan;
  }


  // Nueva función DELETE para eliminar una relación específica ClientePlan
  //@authenticate
  @del('/eliminar-plan/{id}', {
    responses: {
      '200': {
        description: 'Cliente.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async eliminarPlan(
    @param.path.number('id') id: number, // Recibimos la ID del ClientePlan desde la ruta
  ): Promise<any> {
    const clientePlanExists = await this.clientePlanRepository.exists(id); // Verificamos si el ClientePlan existe

    if (!clientePlanExists) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }
    await this.clientePlanRepository.deleteById(id); // Eliminamos el ClientePlan por su ID
  }

  @put('/modificar-plan/{id}', {
    responses: {
      '200': {
        description: 'Cliente.Plan PUT success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async modificarPlan(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {partial: true}),
        },
      },
    })
    clientePlanData: Partial<ClientePlan>,
  ): Promise<void> {
    const clientePlanExists = await this.clientePlanRepository.findById(id); // Verificamos si el ClientePlan existe
    const cliente = await this.clienteRepository.findById(clientePlanData.clienteId);

    if (!clientePlanExists) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }

    // Configuración de Epayco
    const epayco = require('epayco-sdk-node')({
      apiKey: ConfiguracionPagos.apiKey,
      privateKey: ConfiguracionPagos.privateKey,
      lang: 'ES',
      test: true
    })

    //Datos de la tarjeta de crédito de Prueba de Epaycpo
    //  --- No cambiar
    const credit_info = {
      "card[number]": "4575623182290326",
      "card[exp_year]": "2025",
      "card[exp_month]": "12",
      "card[cvc]": "123",
      "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
    }

    epayco.token.create(credit_info)
      .then(function (token: any) {
        console.log(token);
        console.log("Transacción exitosa" + token);
      })
      .catch(function (err: string) {
        console.log("err: " + err);
      });

    const customer_info = {
      token_card: "toke_id",
      name: cliente.primerNombre,
      last_name: cliente.primerApellido,
      email: cliente.correo,
      default: true,
      //Optional parameters: These parameters are important when validating the credit card transaction
      city: cliente.ciudadResidencia,
      address: cliente.direccion,
      phone: cliente.celular,
      cell_phone: "3010000001"
    }

    console.log('customer_info', customer_info);

    var plan_info = {
      id_plan: clientePlanData.id, // Identificador único del plan
      name: clientePlanData.nombre, // Nombre del plan
      description: clientePlanData.detalles, // Descripción del plan
      amount: clientePlanData.tarifa, // Monto del plan
      currency: "cop", // Moneda (COP en este caso)
      interval: "month", // Intervalo de tiempo (mes, semana, etc.)
      interval_count: 1, // Frecuencia del intervalo (cada 1 mes)
      trial_days: 30 // Días de prueba
    };

    epayco.plans.create(plan_info)
      .then(function (plan: ClientePlan) {
        console.log(plan); // Plan creado con éxito
      })
      .catch(function (err: string) {
        console.log("err: " + err); // Manejo de errores
      });

    //Pago por pseint
    var pse_info = {
      bank: "1022",
      invoice: "1472050778",
      description: "pay test",
      value: "10000",
      tax: "0",
      tax_base: "0",
      currency: "COP",
      type_person: "0",
      doc_type: "CC",
      doc_number: "10358519",
      name: "testing",
      last_name: "PAYCO",
      email: "no-responder@payco.co",
      country: "CO",
      cell_phone: "3010000001",
      ip: "190.000.000.000", /*This is the client's IP, it is required */
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      metodoconfirmacion: "GET",

      //Los parámetros extras deben ser enviados tipo string, si se envía tipo array generara error.
      extra1: "",
      extra2: "",
      extra3: "",
      extra4: "",
      extra5: "",
      extra6: ""

    }
    epayco.bank.create(pse_info)
      .then(function (bank: any) {
        console.log(bank);
      })
      .catch(function (err: string) {
        console.log("err: " + err);
      });

    var handler = epayco.checkout.configure({
      key: '45b960805ced5c27ce34b1600b4b9f54',
      test: false
    });
    var data = {
      //Parametros compra (obligatorio)
      name: "Vestido Mujer Primavera",
      description: "Vestido Mujer Primavera",
      invoice: "FAC-1234",
      currency: "cop",
      amount: "5000",
      tax_base: "4000",
      tax: "500",
      tax_ico: "500",
      country: "co",
      lang: "en",

      //Onpage="false" - Standard="true"
      external: "true",


      //Atributos opcionales
      extra1: "extra1",
      extra2: "extra2",
      extra3: "extra3",
      confirmation: "http://secure2.payco.co/prueba_curl.php",
      response: "http://secure2.payco.co/prueba_curl.php",

      //Atributos cliente
      name_billing: "Jhon Doe",
      address_billing: "Carrera 19 numero 14 91",
      type_doc_billing: "cc",
      mobilephone_billing: "3050000000",
      number_doc_billing: "100000000",
      email_billing: "jhondoe@epayco.com",

      //atributo deshabilitación método de pago
      methodsDisable: ["TDC", "PSE", "SP", "CASH", "DP"]

    }

    handler.open(data)

    return this.clientePlanRepository.updateById(id, clientePlanData); // Actualizamos el registro utilizando el método updateById del repository
  }

  @post('/pago-epayco', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async pagoEpayco(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {
            title: 'NewClientePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    clientePlanData: Omit<ClientePlan, 'id'>,
  ): Promise<ClientePlan> {

    const cliente = await this.clienteRepository.findById(clientePlanData.clienteId);

    // Configuración de Epayco
    const epayco = require('epayco-sdk-node')({
      apiKey: ConfiguracionPagos.apiKey,
      privateKey: ConfiguracionPagos.privateKey,
      lang: 'ES',
      test: true
    })

    //Datos de la tarjeta de crédito de Prueba de Epaycpo
    //  --- No cambiar
    const credit_info = {
      "card[number]": "4575623182290326",
      "card[exp_year]": "2025",
      "card[exp_month]": "12",
      "card[cvc]": "123",
      "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
    }

    epayco.token.create(credit_info)
      .then(function (token: any) {
        console.log(token);
        console.log("Transacción exitosa" + token);
      })
      .catch(function (err: string) {
        console.log("err: " + err);
      });

    const customer_info = {
      token_card: "toke_id",
      name: cliente.primerNombre,
      last_name: cliente.primerApellido,
      email: cliente.correo,
      default: true,
      //Optional parameters: These parameters are important when validating the credit card transaction
      city: cliente.ciudadResidencia,
      address: cliente.direccion,
      phone: cliente.celular,
      cell_phone: "3010000001"
    }

    console.log('customer_info', customer_info);
    return clientePlanData;
  }
}
